import { Injectable } from '@angular/core';
import { SocketService } from 'src/app/global/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: any[] = [];

  constructor(private socket: SocketService) {
    this.socket.listen('chatMsg').subscribe((msg: any) => {
      this.messages.unshift(msg);
    });
  }
}
