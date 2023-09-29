import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(public chat: ChatService) {

  }
}
