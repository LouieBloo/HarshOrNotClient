import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { FetchProfileService } from '../../../services/user/profiles/fetch/fetch-profile.service';
import { UpdateProfileService } from '../../../services/user/profiles/update/update-profile.service';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:User = {name:"",email:"",gender:"",preference:"",location:{zip:""},bodyType:"",range:30,ageRange:{min:18,max:100}};
  alert:string;
  ageRange = [18,100];//we have to duplicate this so our noui component works with a double slider :(

  constructor(private userService:FetchProfileService,private userUpdate:UpdateProfileService) { }

  ngOnInit() {
    this.userService.fetchMyself().subscribe(response =>{
      this.user = response;
      if(response.location == null){
        this.user.location = {zip:""};//need to set this incase the user has never had a location
      }
      this.mapAgeRangeFromAPI(response);
      console.log(response);
    });
  }

  updatePreferences(){
    this.alert = "Updating...";

    this.mapAgeRangeToAPI();
    this.userUpdate.updatePreferences(this.user).subscribe(response=>{

      console.log(response);

      if(response.error != null){
        this.alert = JSON.stringify(response.error);
        return;
      }
      this.alert = "Done!";

      this.user = response;
      this.mapAgeRangeFromAPI(response);
    });
  }

  //since the noui range uses an array, we have to map it to our ageRange objects min and max properties
  mapAgeRangeFromAPI(data){
    this.ageRange = [data.ageRange.min,data.ageRange.max];//have to set this manually
  }
  //set the correct age range for the api
  mapAgeRangeToAPI(){
    this.user.ageRange ={min:this.ageRange[0],max:this.ageRange[1]}
  }
}
