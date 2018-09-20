import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed:boolean = true;

  @ViewChild('menu') menu;


  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
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
