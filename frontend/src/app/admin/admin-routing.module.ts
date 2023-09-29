import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorMainComponent } from './editor/editor-main/editor-main.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { BattleReportsListComponent } from './battle-reports/battle-reports-list/battle-reports-list.component';
import { BattleReportsEditComponent } from './battle-reports/battle-reports-edit/battle-reports-edit.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      {
        path: 'editor',
        component: EditorMainComponent,
      },
      { path: 'battlereports', component: BattleReportsListComponent },
      { path: 'battlereports/edit/:id', component: BattleReportsEditComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
