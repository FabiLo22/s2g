import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webrtc } from './webrtc';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent {

  @ViewChild('videoElement') video: any;

  private webrtc = new Webrtc('stream1', this.socket);

  constructor(private socket: SocketService) {

  }

  ngAfterViewInit(): void {
    this.webrtc.onStream.subscribe(() => {
      this.searchForMedia();
    });
    this.searchForMedia();    
  }

  searchForMedia() {
    console.log('debug1');

    if (this.webrtc.live) {

        this.video.nativeElement.srcObject = this.webrtc.media;

        this.video.nativeElement.play();

    }
  }
}
