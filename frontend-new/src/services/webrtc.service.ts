import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  public test: string = '1';

  constructor() {
    console.log('nice');
   }
}
