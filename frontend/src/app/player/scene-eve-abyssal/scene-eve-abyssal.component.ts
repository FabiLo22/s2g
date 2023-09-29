import { Component } from '@angular/core';
import { WebrtcService } from 'src/app/global/services/webrtc.service';

@Component({
  selector: 'app-scene-eve-abyssal',
  templateUrl: './scene-eve-abyssal.component.html',
  styleUrls: ['./scene-eve-abyssal.component.scss']
})
export class SceneEveAbyssalComponent {
  constructor(public webrtc: WebrtcService) {}
}
