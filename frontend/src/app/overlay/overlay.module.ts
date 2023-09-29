import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayRoutingModule } from './overlay-routing.module';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayAdminComponent } from './overlay-admin/overlay-admin.component';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';

import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    OverlayComponent,
    OverlayAdminComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    HeaderModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    OverlayRoutingModule,
    ReactiveFormsModule
  ]
})
export class OverlayModule { }
