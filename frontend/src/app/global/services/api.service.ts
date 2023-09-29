import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: any) {
    return this.http.get(environment.backendURI + path);
  }

  post(path: any, payload: any) {
    return this.http.post(environment.backendURI + path, payload);
  }

  put(path: any, payload: any) {
    return this.http.put(environment.backendURI + path, payload);
  }

  delete(path: any) {
    return this.http.delete(environment.backendURI + path);
  }

  timed(path: any, payload: any, type: string, time: number) {
    return timer(0, time).pipe(
      switchMap(res => from(this.whichTimed(path, payload, type))),
    );
  }

  whichTimed(path: any, payload: any, type: string) {
    switch (type) {
      case 'post':
        return this.post(path, payload);
        break;
      case 'put':
        return this.post(path, payload);
        break;
      default:
        return this.get(path);
    }
  }
}
