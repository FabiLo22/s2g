import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditorModule } from './editor/editor.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BattleReportsModule } from './battle-reports/battle-reports.module';

@NgModule({
  declarations: [
    AdminMainComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    EditorModule,
    BattleReportsModule
  ]
})
export class AdminModule { }
