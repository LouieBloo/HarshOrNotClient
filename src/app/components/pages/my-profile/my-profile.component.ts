import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { FetchProfileService } from '../../../services/user/profiles/fetch/fetch-profile.service';
import { UpdateProfileService } from '../../../services/user/profiles/update/update-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:User = {name:"",email:"",gender:"",preference:""};
  alert:string;

  constructor(private userService:FetchProfileService,private userUpdate:UpdateProfileService) { }

  ngOnInit() {
    this.userService.fetchMyself().subscribe(response =>{
      this.user = response;
    });
  }

  update(){
    this.alert = "Updating...";
    this.userUpdate.updatePreferences(this.user).subscribe(response=>{
      console.log(response);
      this.alert = "Done!";
    });
  }

}
