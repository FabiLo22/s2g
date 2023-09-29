import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io(environment.socketURI, { rejectUnauthorized: false });
  private id: string = '';

  constructor() {
    this.socket.on('connect', () => {
      console.log('connected');
      this.id = this.socket.id;
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });    
  }

  emit(event: any, payload: any): Observable<any> {
    return new Observable(sub => {
      this.socket.emit(event, payload, (res: any, err: any) => {
        if(err) {
          console.log(err);
        } else {
          sub.next(res);
        }
      });
    });    
  }

  listen(event: any): Observable<any> {
    return new Observable(sub => {
      this.socket.on(event, (payload: any) => {
        sub.next(payload);
      });
    });
  }
}
