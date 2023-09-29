import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { MenuModule } from '../menu/menu.module';
import { HeaderModule } from '../header/header.module';


@NgModule({
  declarations: [
    StreamingComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    HeaderModule,    
    StreamingRoutingModule
  ]
})
export class StreamingModule { }
