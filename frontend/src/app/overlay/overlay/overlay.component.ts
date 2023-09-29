import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ApiService } from 'src/app/global/services/api.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  public setup: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.getSetup();
    interval(60000).subscribe(() => {
      this.getSetup();
    })
   
  }

  getSetup() {
    this.api.get('/overlay/setup').subscribe(setup => {
      this.setup = setup;
    })
  }
}
