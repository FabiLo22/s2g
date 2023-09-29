import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../global/guards/auth.guard';
import { StreamingComponent } from './streaming.component';

const routes: Routes = [
  { path: 'streaming', component: StreamingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingRoutingModule { }
