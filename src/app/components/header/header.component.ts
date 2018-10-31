import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChatService } from '../../services/user/chat/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed:boolean = true;

  @ViewChild('menu') menu;


  constructor(private auth:AuthService,private chat:ChatService) { }

  ngOnInit() {
    this.chat.startup();
  }

  logout(){
    this.auth.logout();
    this.chat.logout();
  }

  //fired when the big menu button is clicked on mobile
  menuToggleClicked(){
    this.isCollapsed = !this.isCollapsed;
  }

  //fired when any list item on the menu is clicked
  menuItemClicked(){
    if(!this.isCollapsed){
      this.isCollapsed = true;
      this.menu.nativeElement.className = this.menu.nativeElement.className.replace("show","");
    }
  }

}
