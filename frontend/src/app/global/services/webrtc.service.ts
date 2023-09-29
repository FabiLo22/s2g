import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebrtcService {
  private streamer: string = '';
  private partnerId: string = '';
  private connection: any;
  public streams: any = [];
  public onStream: Subject<any> = new Subject();

  constructor(private socket: SocketService) {
    this.createListener();
    this.createConnection('stream1');
    // this.createConnection('stream2');
    // this.createConnection('stream3');
    // this.createConnection('stream4');
    this.createConnection('camera1');
    // this.createConnection('camera2');
    // this.createConnection('camera3');
    // this.createConnection('camera4');
    // this.createConnection('chatmedia');
  }

  createListener() {
    this.socket.listen('message').subscribe((payload: any) => {
      const stream = this.streams.find(
        (stream) => stream.streamer == payload.streamer
      );
      switch (payload.type) {
        case 'offer':
          this.answer(stream, payload);
          break;
      }
    });
  }

  createConnection(streamer) {
    const stream = {
      streamer: streamer,
      connection: new RTCPeerConnection({
        iceServers: [{ urls: [environment.stunServer] }],
      }),
      media: new MediaStream(),
      live: false,
    };

    stream.connection.addEventListener('track', (e) => {
      stream.media = e.streams[0];
    });

    this.socket.emit('registerStreamer', streamer).subscribe();

    this.createICEHandlers(stream);

    this.streams.push(stream);
  }

  createICEHandlers(stream) {
    stream.connection.addEventListener('icecandidate', (event) => {
      this.socket
        .emit('message', {
          streamer: stream.streamer,
          type: 'iceicebaby',
          candidate: event.candidate,
        })
        .subscribe();
    });

    stream.connection.addEventListener('iceconnectionstatechange', (event) => {
      if (stream.connection.iceConnectionState == 'disconnected') {
        stream.media = new MediaStream();
        stream.live = false;
        this.onStream.next(null);

        this.socket.emit('unregisterStream', stream.streamer).subscribe();
      }
      if (stream.connection.iceConnectionState == 'connected') {
        stream.live = true;
        this.onStream.next(event);
      }
    });
  }

  async answer(stream: any, payload: any) {
    await stream.connection.setRemoteDescription(payload);
    const answer = await stream.connection.createAnswer();

    this.socket
      .emit('message', {
        streamer: stream.streamer,
        type: 'answer',
        sdp: answer.sdp,
      })
      .subscribe();

    await stream.connection.setLocalDescription(answer);
  }

  findStreamByStreamer(streamer) {
    return this.streams.find((stream) => stream.streamer == streamer);
  }

  isLive(streamer) {
    return this.findStreamByStreamer(streamer).live;
  }
}
