import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { timingSafeEqual } from 'crypto';
import { Subject, first } from 'rxjs';
import { Server } from 'socket.io';
import { TwitchService } from './social/twitch/twitch.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway {
  public newSdp: Subject<any> = new Subject();
  public newAnswer: Subject<any> = new Subject();

  private clients: any = [];
  public streams: any = [];
  private settings: any = {
    scene: '/player/scene/eve/full'
  }

  constructor(private twitch: TwitchService) {
    this.newSdp.subscribe(res => {
      const stream = this.streams.find(stream => stream.streamer == res.streamer);

      if (stream) {
        stream.client.emit('message', { streamer: stream.streamer, type: 'offer', sdp: res.sdp });
      }
    })

    this.twitch.chat.subscribe(msg => {
      this.clients.forEach(_client => {
        _client.socket.emit('chatMsg', msg);
      })
    })
  }

  afterInit(server: Server) {
    server.on('connection', socket => {
      const client = {
        id: socket.id,
        socket
      };

      this.clients.push(client);

      socket.on('disconnect', () => {
        this.clients.splice(
          this.clients.findIndex(value => value.id === socket.id),
          1,
        );
      });
    });
  }

  @SubscribeMessage('settings')
  handleSettings(client: any, payload: any) {
    if (payload) {
      this.settings = payload;

      this.clients.forEach(_client => {
        _client.socket.emit('settings', this.settings);
      });
    } else {
      return this.settings;
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    const stream = this.streams.find(stream => stream.streamer == payload.streamer);
    switch (payload.type) {
      case 'offer':
        stream.sdp.pipe(first()).subscribe(() => {
          client.emit('message', { streamer: stream.streamer, type: 'answer', sdp: stream.answer });
        })
        stream.client.emit('message', { streamer: stream.streamer, type: 'offer', sdp: payload.sdp });
        break;
      case 'answer':
        stream.answer = payload.sdp.replace('m=video', 'a=end-of-candidates\r\nm=video');
        break;
      case 'iceicebaby':
        if (payload.candidate) {
          if (payload.candidate.candidate !== '') {
            stream.answer = stream.answer.replace('a=end-of-candidates', `a=${payload.candidate.candidate}\r\na=end-of-candidates`);
          }
        } else {
          console.log(stream.answer);
          stream.sdp.next(stream.answer);
        }
        break;
    }
  }

  @SubscribeMessage('registerStreamer')
  handleRegisterStreamer(client: any, streamer: any): void {
    const stream = this.streams.find(stream => stream.streamer == streamer);

    if (stream) {
      stream.client = client;
    } else {
      this.streams.push({
        streamer: streamer,
        client: client,
        answer: '',
        sdp: new Subject()
      });
    }
  }

  @SubscribeMessage('unregisterStream')
  handleUnregisterStream(client: any, streamer: any): void {
    this.streams.splice(
      this.streams.findIndex(value => value === streamer),
      1,
    );
  }
}
