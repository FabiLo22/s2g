import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EvEOnlineAPIService } from '../services/eveonline-api.service';

@Injectable({
  providedIn: 'root'
})
export class EvEOnlineGuard implements CanActivate {
  constructor(private router: Router, private EveOnlineAPI: EvEOnlineAPIService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    localStorage.setItem('eve-online.source', this.router.url);

    return (this.EveOnlineAPI.isAuthorized()) ? true : this.router.parseUrl('/oauth/eve-online');
  }
  
}
