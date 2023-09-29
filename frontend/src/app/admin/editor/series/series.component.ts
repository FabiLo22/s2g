import { Component, ViewChild } from '@angular/core';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent {
  public isInputActive: boolean = false;

  @ViewChild('test') test: any;

  public testImage() {
    toPng(this.test.nativeElement).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    });
  }
}
