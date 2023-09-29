import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { WebrtcService } from 'src/app/global/services/webrtc.service';

@Component({
  selector: 'stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements AfterViewInit {
  @Input() stream?: String;
  @Input() audioOnly?: Boolean = false;
  @Input() mask?: String;
  @Input() blur?: String;
  @Input() shadow?: Boolean = false;
  @Input() mirror?: Boolean = false;

  @ViewChild('videoElement') video: any;
  @ViewChild('audioElement') audio: any;
  @ViewChild('containerRef') container: any;
  @ViewChild('blurMaskRef') blurMask: any;

  constructor(private webrtc: WebrtcService) {}

  ngAfterViewInit(): void {
    this.webrtc.onStream.subscribe(() => {
      this.searchForMedia();
    });
    this.searchForMedia();

    if (!this.audioOnly) {
      if (this.mask && this.blur) {
        this.blurMask.nativeElement.style[
          '-webkit-mask-image'
        ] = `url('${this.mask}')`;
        this.blurMask.nativeElement.style['background'] = 'rgba(0,0,0,0.3)';
        this.blurMask.nativeElement.style[
          'backdrop-filter'
        ] = `blur(${this.blur})`;
      } else if (this.mask) {
        this.video.nativeElement.style[
          '-webkit-mask-image'
        ] = `url('${this.mask}')`;
      }
    }
  }

  searchForMedia() {
    console.log('debug1');
    const stream = this.webrtc.findStreamByStreamer(this.stream);
    if (stream?.live) {
      if (!this.audioOnly) {
        console.log(stream.media.getTracks());
        this.video.nativeElement.srcObject = stream.media;

        this.video.nativeElement.play();
      } else {
        this.audio.nativeElement.srcObject = stream.media;
        this.audio.nativeElement.play();
      }
    }
  }

  setContainerDimensions(width: any, height: any) {
    console.log(this.container.nativeElement);
  }
}
