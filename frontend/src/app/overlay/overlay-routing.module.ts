import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayAdminComponent } from './overlay-admin/overlay-admin.component';

const routes: Routes = [
  { path: 'overlay/admin', component: OverlayAdminComponent },
  { path: 'overlay/:type', component: OverlayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverlayRoutingModule { }
