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

  user:User = {name:"",email:"",gender:"",preference:"",location:{zip:""}};
  alert:string;

  constructor(private userService:FetchProfileService,private userUpdate:UpdateProfileService) { }

  ngOnInit() {
    this.userService.fetchMyself().subscribe(response =>{
      this.user = response;
      if(response.location == null){
        this.user.location = {zip:""};//need to set this incase the user has never had a location
      }
      console.log(response);
    });
  }

  update(){
    this.alert = "Updating...";
    this.userUpdate.updatePreferences(this.user).subscribe(response=>{
      console.log(response);
      if(response.error != null){
        console.log("Error!");
        this.alert = response.error;
        return;
      }
      this.alert = "Done!";
      this.user = response;
      console.log("updated ok...");
      //this.user.location.zip = response.zip;
    });
  }

}
