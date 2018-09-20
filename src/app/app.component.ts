import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { LastOnlineService } from './services/statistics/last-online/last-online.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Harsh';

  constructor(public auth:AuthService,private lastOnlineService:LastOnlineService){}

  @HostListener('click')
  clickInside() {
    this.lastOnlineService.pageClicked();
  }
}
