import { Component } from '@angular/core';
import { WebrtcService } from 'src/app/global/services/webrtc.service';

@Component({
  selector: 'app-scene-bb-multicam2',
  templateUrl: './scene-bb-multicam2.component.html',
  styleUrls: ['./scene-bb-multicam2.component.scss']
})
export class SceneBbMulticam2Component {
  constructor(public webrtc: WebrtcService) {}
}
