import { Component } from '@angular/core';
import { menu } from './menu';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
  public menu: any = menu;
}
