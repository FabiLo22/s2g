import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { StreamComponent } from './stream/stream.component';
import { SceneEveFullComponent } from './scene-eve-full/scene-eve-full.component';
import { SceneEveBaitComponent } from './scene-eve-bait/scene-eve-bait.component';
import { SceneEveScoutComponent } from './scene-eve-scout/scene-eve-scout.component';
import { SceneEveStealthComponent } from './scene-eve-stealth/scene-eve-stealth.component';
import { PlayerComponent } from './player/player.component';
import { SceneEveFittingComponent } from './scene-eve-fitting/scene-eve-fitting.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SceneBbMulticam2Component } from './scene-bb-multicam2/scene-bb-multicam2.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { ReversePipe } from '../global/pipes/reverse.pipe';
import { SceneEveAbyssalComponent } from './scene-eve-abyssal/scene-eve-abyssal.component';
import { SceneBbSolo1Component } from './scene-bb-solo1/scene-bb-solo1.component';
import { SceneBbSolo2Component } from './scene-bb-solo2/scene-bb-solo2.component';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [
    StreamComponent,
    SceneEveFullComponent,
    SceneEveBaitComponent,
    SceneEveScoutComponent,
    SceneEveStealthComponent,
    PlayerComponent,
    SceneEveFittingComponent,
    SceneBbMulticam2Component,
    ChatComponent,
    ReversePipe,
    SceneEveAbyssalComponent,
    SceneBbSolo1Component,
    SceneBbSolo2Component
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FlexLayoutModule,
    WidgetsModule
  ],
  providers: [
    ChatService
  ]
})
export class PlayerModule { }
