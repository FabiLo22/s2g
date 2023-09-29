import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/global/services/api.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let code = '';

    switch(this.route.snapshot.params.service) {
      case 'twitch':
        code = this.route.snapshot.queryParams.code;

        this.api.put('/twitch/oauth/', { code }).subscribe(res => {
          console.log(res);
        })        
      break;
      case 'youtube':
        code = this.route.snapshot.queryParams.code;

        this.api.put('/youtube/oauth/', { code }).subscribe(res => {
          console.log(res);
        })        
      break;      
      case 'eveonline':
        code = this.route.snapshot.queryParams.code;

        this.api.put('/eveonline/oauth/', { code }).subscribe(res => {
          console.log(res);
        })
      break;      
    }
  }

}
