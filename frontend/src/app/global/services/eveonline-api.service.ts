import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EvEOnlineAPIService {

  private token: any = null;

  constructor(private api: ApiService) {
    const token = localStorage.getItem('eve-online.token');

    if(token) {
      this.token = JSON.parse(token);
    }
   }

  isAuthorized() {
      if(this.token) {
        const expireDate = new Date(this.token.expires)
        const currentDate = new Date();

        // Token is valid
        if(expireDate.getTime() > currentDate.getTime()) {
          return true;
        }
      }

      return false;
  }

  killmails() {
    this.api.post('/eve-online/killmails', { token: this.token }).subscribe(res => {
      console.log(res);
    })
  }
}
