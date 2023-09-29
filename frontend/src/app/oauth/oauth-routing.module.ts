import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  { path: 'oauth/:service', component: RedirectComponent },
  { path: 'oauth/:service/token', component: TokenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
