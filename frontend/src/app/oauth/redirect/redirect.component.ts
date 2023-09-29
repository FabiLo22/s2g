import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/global/services/api.service';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    let url = '';
    let res: any = null;

    switch(this.route.snapshot.params.service) {
      case 'twitch':
        url = environment.twitchTarget.replace('{{CLIENT_ID}}', environment.twitchClientId).replace('{{REDIRECT}}', environment.twitchRedirect).replace('{{SCOPES}}', environment.twitchScopes);
      break;
      case 'eveonline':
        res = await firstValueFrom(this.apiService.get('/eveonline/redirect'));
        
        url = res.redirect;
        break;
      case 'youtube':
        res = await firstValueFrom(this.apiService.get('/youtube/redirect'));
        
        url = res.redirect;
      break;
    }

    window.location.href = url;
  }

}
