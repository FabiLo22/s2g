import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorMainComponent } from './editor-main/editor-main.component';
import { SeriesComponent } from './series/series.component';



@NgModule({
  declarations: [
    EditorMainComponent,
    SeriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditorModule { }
