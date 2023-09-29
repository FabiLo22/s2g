import { Component, ViewChild } from '@angular/core';

import { setups } from './setups';

@Component({
  selector: 'app-scene-eve-fitting',
  templateUrl: './scene-eve-fitting.component.html',
  styleUrls: ['./scene-eve-fitting.component.scss']
})
export class SceneEveFittingComponent {
  public setups = setups;

  @ViewChild('fittingWindow') fitting: any;

  public activeSetup() {
    return this.setups.find(setup => setup.active == true);
  }
}
