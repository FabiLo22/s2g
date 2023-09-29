import { Component } from '@angular/core';

@Component({
  selector: 'app-battle-reports-main',
  templateUrl: './battle-reports-main.component.html',
  styleUrls: ['./battle-reports-main.component.scss']
})
export class BattleReportsMainComponent {
  public activeTab: string = 'tabSeries';
}
