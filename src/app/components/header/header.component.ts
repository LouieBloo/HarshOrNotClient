import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChatService } from '../../services/user/chat/chat.service';
import { LocationService } from 'src/app/services/user/location/location.service';
import { DiscoverableService } from 'src/app/services/user/profiles/discoverable/discoverable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed:boolean = true;

  discoverableListener:any;
  discoverableDescription:string;

  @ViewChild('menu') menu;


  constructor(private auth:AuthService,private chat:ChatService,private location:LocationService,private discoverable:DiscoverableService) { }

  ngOnInit() {
    this.chat.startup();
    this.location.startup();

    this.discoverableListener = this.discoverable.alertEmitter.subscribe(data=>{
      if(data){
        this.discoverableDescription = data.description;
      }
    })
    //this.discoverable.checkIfDiscoverable(); location service will handle calling this
  }

  logout(){
    this.auth.logout();
    this.chat.logout();

    this.discoverableListener.unsubscribe();
    this.discoverableDescription = null;
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
