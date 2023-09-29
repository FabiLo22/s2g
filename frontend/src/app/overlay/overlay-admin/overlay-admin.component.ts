import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/global/services/api.service';

@Component({
  selector: 'app-overlay-admin',
  templateUrl: './overlay-admin.component.html',
  styleUrls: ['./overlay-admin.component.scss']
})
export class OverlayAdminComponent implements OnInit {

  public ships: any = [];
  public setup: any = [];
  public setupForm: FormGroup = new FormGroup({
    ship: new FormControl(),
    weapon: new FormControl()
  })
  public abyssalForm: FormGroup = new FormGroup({
    targetValue: new FormControl(),
    currentValue: new FormControl()
  })

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('/overlay/ships').subscribe(ships => {
      this.ships = ships;
    })

    this.api.get('/overlay/setup').subscribe(setup => {
      this.setup = setup;
    });

    this.api.get('/abyssal').subscribe((abyssal: any) => {
      this.abyssalForm.setValue({
        targetValue: abyssal.targetValue,
        currentValue: abyssal.currentValue
      })
    });
  }

  addToSetup() {
    this.api.post('/overlay/setup/add/ship', this.setupForm.getRawValue()).subscribe(res => {
      this.setup.push(res);
      this.setupForm.reset();
    });
  }

  deleteFromSetup(ship) {
    this.api.put('/overlay/setup/delete/ship', ship).subscribe(res => {
      this.setup = res;
    });    
  }

  updateAbyssal() {
    this.api.put('/abyssal', this.abyssalForm.getRawValue()).subscribe();    
  }

}
