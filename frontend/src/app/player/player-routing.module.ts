import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceneEveFullComponent } from './scene-eve-full/scene-eve-full.component';
import { SceneEveScoutComponent } from './scene-eve-scout/scene-eve-scout.component';
import { SceneEveBaitComponent } from './scene-eve-bait/scene-eve-bait.component';
import { SceneEveStealthComponent } from './scene-eve-stealth/scene-eve-stealth.component';
import { PlayerComponent } from './player/player.component';
import { SceneEveFittingComponent } from './scene-eve-fitting/scene-eve-fitting.component';
import { SceneBbMulticam2Component } from './scene-bb-multicam2/scene-bb-multicam2.component';
import { SceneEveAbyssalComponent } from './scene-eve-abyssal/scene-eve-abyssal.component';
import { SceneBbSolo1Component } from './scene-bb-solo1/scene-bb-solo1.component';
import { SceneBbSolo2Component } from './scene-bb-solo2/scene-bb-solo2.component';

const routes: Routes = [
  { path: 'player', component: PlayerComponent, children: [
    { path: 'scene/eve/full', component: SceneEveFullComponent },
    { path: 'scene/eve/scout', component: SceneEveScoutComponent },
    { path: 'scene/eve/bait', component: SceneEveBaitComponent },
    { path: 'scene/eve/stealth', component: SceneEveStealthComponent },
    { path: 'scene/eve/fitting', component: SceneEveFittingComponent },
    { path: 'scene/eve/abyssal', component: SceneEveAbyssalComponent },
    { path: 'scene/bb/multicam2', component: SceneBbMulticam2Component },
    { path: 'scene/bb/solo1', component: SceneBbSolo1Component },
    { path: 'scene/bb/solo2', component: SceneBbSolo2Component }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
