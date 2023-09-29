import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleReportsMainComponent } from './battle-reports-main/battle-reports-main.component';
import { BattleReportsListComponent } from './battle-reports-list/battle-reports-list.component';
import { BattleReportsEditComponent } from './battle-reports-edit/battle-reports-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BattleReportsMainComponent,
    BattleReportsListComponent,
    BattleReportsEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class BattleReportsModule { }
