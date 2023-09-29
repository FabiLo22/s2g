import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.scss'],
})
export class EditorMainComponent {
  public activeTab: string = 'tabSeries';
}
