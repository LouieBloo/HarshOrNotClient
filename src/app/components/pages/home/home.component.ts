import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { WelcomeService } from '../../../services/user/home/welcome/welcome.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User;

  showLocationAlert:boolean;

  constructor(private welcomeService:WelcomeService) { }

  ngOnInit() {
    this.welcomeService.getWelcomeInfo().subscribe(result =>{
      this.user = result;
      if(this.user.location == null || this.user.location.zip == null){
        this.showLocationAlert = true;
      }
    })
  }

  searchButtonClicked(){
  }

}
