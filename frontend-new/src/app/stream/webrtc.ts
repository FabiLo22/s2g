import { environment } from "src/environments/environment";
import { SocketService } from "../services/socket.service";
import { Subject } from "rxjs";

export class Webrtc {
  private connection = new RTCPeerConnection({
    iceServers: [{ urls: [environment.stunServer] }]
  })
  public media: MediaStream = new MediaStream();
  public live: boolean = false;
  public onStream: Subject<any> = new Subject();

  constructor(private streamer: String, private socket: SocketService) {
    this.socket.listen('message').subscribe((payload: any) => {
      if(payload.streamer == this.streamer) {
        switch (payload.type) {
          case 'offer':
              this.answer(payload);
            break;
        }
      }
    });

    this.connection.addEventListener('track', (e) => {
      this.media = e.streams[0];
    })

    this.connection.addEventListener('icecandidate', (event) => {
      this.socket
        .emit('message', {
          streamer: this.streamer,
          type: 'iceicebaby',
          candidate: event.candidate,
        })
        .subscribe();
    });

    this.connection.addEventListener('iceconnectionstatechange', (event) => {
      if (this.connection.iceConnectionState == 'disconnected') {
        this.media = new MediaStream();
        this.live = false;
        this.onStream.next(null);

        this.socket.emit('unregisterStream', this.streamer).subscribe();
      }
      if (this.connection.iceConnectionState == 'connected') {
        this.live = true;
        this.onStream.next(event);
      }
    });

    this.socket.emit('registerStreamer', this.streamer).subscribe();
  }

  async answer(payload: any) {
    await this.connection.setRemoteDescription(payload);
    const answer = await this.connection.createAnswer();

    this.socket
      .emit('message', {
        streamer: this.streamer,
        type: 'answer',
        sdp: answer.sdp,
      })
      .subscribe();

    await this.connection.setLocalDescription(answer);
  }
}
