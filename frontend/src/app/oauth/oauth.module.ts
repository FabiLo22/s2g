import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { RedirectComponent } from './redirect/redirect.component';
import { TokenComponent } from './token/token.component';


@NgModule({
  declarations: [
    RedirectComponent,
    TokenComponent
  ],
  imports: [
    CommonModule,
    OauthRoutingModule
  ]
})
export class OauthModule { }
