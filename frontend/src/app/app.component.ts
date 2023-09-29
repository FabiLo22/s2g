import { Component } from '@angular/core';
import { SocketService } from './global/services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private socket: SocketService, private route: ActivatedRoute, private router: Router) {
    this.socket.listen('settings').subscribe((payload: any) => {
      this.router.navigateByUrl(payload.scene);
    });

    console.log(this.route.snapshot);
  }
}
