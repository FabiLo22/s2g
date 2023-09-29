import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './global/services/api.service';
import { WebrtcService } from './global/services/webrtc.service';
import { SocketService } from './global/services/socket.service';
import { HeaderModule } from './header/header.module';
import { MenuModule } from './menu/menu.module';
import { OauthModule } from './oauth/oauth.module';
import { StreamingModule } from './streaming/streaming.module';
import { OverlayModule } from './overlay/overlay.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerModule } from './player/player.module';
import { AdminModule } from './admin/admin.module';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    HeaderModule,
    StreamingModule,
    PlayerModule,
    AdminModule,
    OauthModule,
    OverlayModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatMomentDateModule
  ],
  providers: [ApiService, WebrtcService, SocketService, {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
