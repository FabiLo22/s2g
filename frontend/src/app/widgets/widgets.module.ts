import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbyssalComponent } from './abyssal/abyssal.component';
import { CountUpModule } from 'ngx-countup';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AbyssalComponent
  ],
  imports: [
    CommonModule,
    CountUpModule,
    FlexLayoutModule
  ],
  exports: [
    AbyssalComponent
  ]
})
export class WidgetsModule { }
