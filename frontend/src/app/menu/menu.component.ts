import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menu = {
    left: [
      { text: 'Streaming', link: '/streaming' },
      { text: 'Overlay', link: '/overlay/admin' }
    ],
    right: [
      { text: 'Video Editor', link: '/video-editor' },
      { text: 'Battle Reports', link: '/battle-reports' }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
