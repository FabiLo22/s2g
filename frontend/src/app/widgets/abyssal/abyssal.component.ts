import { Component } from '@angular/core';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/global/services/api.service';

@Component({
  selector: 'abyssal',
  templateUrl: './abyssal.component.html',
  styleUrls: ['./abyssal.component.scss'],
})
export class AbyssalComponent {
  public currentValue: number = 0;
  public oldValue: number = 0;
  public targetValue: number = 0;

  constructor(private api: ApiService) {
    this.api.timed('/abyssal', null, 'get', 5000).subscribe((res: any) => {
      if (this.currentValue !== res.currentValue) {
        this.oldValue = this.currentValue;
        this.currentValue = res.currentValue;
      }

      this.targetValue = res.targetValue;
    });
  }
}
