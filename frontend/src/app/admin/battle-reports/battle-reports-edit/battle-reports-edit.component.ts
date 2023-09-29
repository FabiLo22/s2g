import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from 'src/app/global/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export interface System {
  name: string;
}

@Component({
  selector: 'app-battle-reports-edit',
  templateUrl: './battle-reports-edit.component.html',
  styleUrls: ['./battle-reports-edit.component.scss']
})
export class BattleReportsEditComponent {

  private battleReport: any = null;
  public editForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    endTime: ['', Validators.required]
  })

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public systems: System[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.getBattleReport();
  }

  private async getBattleReport() {
    this.battleReport = await firstValueFrom(this.api.get('/battlereports/' + this.route.snapshot.params.id));

    this.editForm.get('name')?.setValue(this.battleReport.name);

    const startTime = new Date(this.battleReport.starttime);
    this.editForm.get('startDate')?.setValue(startTime.toISOString());
    this.editForm.get('startTime')?.setValue(startTime.getHours() + ':' + startTime.getMinutes());

    const endTime = new Date(this.battleReport.endtime);
    this.editForm.get('endDate')?.setValue(endTime.toISOString());
    this.editForm.get('endTime')?.setValue(endTime.getHours() + ':' + endTime.getMinutes());

    this.systems = this.battleReport.systems;
  }

  public updateBattlereport() {
    const formData = this.editForm.getRawValue();

    this.battleReport.name = formData.name;

    const tempStartDate = new Date(formData.startDate!);
    tempStartDate.setHours(parseInt(formData.startTime!.split(':')[0]));
    tempStartDate.setMinutes(parseInt(formData.startTime!.split(':')[1]));
    this.battleReport.starttime = tempStartDate.getTime();

    const tempEndDate = new Date(formData.endDate!);
    tempEndDate.setHours(parseInt(formData.endTime!.split(':')[0]));
    tempEndDate.setMinutes(parseInt(formData.endTime!.split(':')[1]));
    this.battleReport.endtime = tempEndDate.getTime(); 
    
    this.battleReport.systems = this.systems;

    this.api.post('/battlereports', this.battleReport).subscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.systems.push({name: value});
    }

    event.chipInput!.clear();
  }

  remove(system: System): void {
    const index = this.systems.indexOf(system);

    if (index >= 0) {
      this.systems.splice(index, 1);
    }
  }

  edit(system: System, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(system);
      return;
    }

    const index = this.systems.indexOf(system);
    if (index >= 0) {
      this.systems[index].name = value;
    }
  }
}
