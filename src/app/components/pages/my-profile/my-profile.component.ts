import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { FetchProfileService } from '../../../services/user/profiles/fetch/fetch-profile.service';
import { UpdateProfileService } from '../../../services/user/profiles/update/update-profile.service';
import { NouisliderModule } from 'ng2-nouislider';
import { AgeRangeService } from '../../../services/sanitation/user/ageRange/age-range.service';
import { UserHelperService } from '../../../services/user/user-helper.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User = { name: "", email: "", gender: "", preference: "", location: { zip: "" }, bodyType: "", range: 30, ageRange: { min: 18, max: 100 }};
  alert: string;
  ageRange = [18, 100];//we have to duplicate this so our noui component works with a double slider :(

  constructor(private userService: FetchProfileService, private userUpdate: UpdateProfileService, private ageRangeConverter: AgeRangeService, private userHelper: UserHelperService) { }

  ngOnInit() {
    
    this.userService.fetchMyself().subscribe(response => {
      
      console.log(response);

      this.user = response;
      if (response.location == null) {
        this.user.location = { zip: "" };//need to set this incase the user has never had a location
      }
      
      //if the user has no body type preferences, set them all checked
      if (response.bodyTypePreference == null || response.bodyTypePreference.length < 1) {
        this.user.bodyTypePreferenceRaw = this.userHelper.setAllBodyTypes();
      } else {
        this.user.bodyTypePreferenceRaw = this.userHelper.bodyTypeArrayToObj(this.user.bodyTypePreference);
      }

      this.ageRange = this.ageRangeConverter.mapAgeRangeFromAPI(this.user);
    });
  }

  updatePreferences() {
    this.alert = "Updating...";

    this.user.ageRange = this.ageRangeConverter.mapAgeRangeToAPI(this.ageRange);
    this.user.bodyTypePreference = this.userHelper.bodyTypeObjToArray(this.user.bodyTypePreferenceRaw);
    
    this.userUpdate.updatePreferences(this.user).subscribe(response => {

      console.log('finsished');
      console.log(response);
      //return;
      if (response.error != null) {
        this.alert = JSON.stringify(response.error);
        return;
      }
      this.alert = "Done!";

      this.user = response;
      this.ageRange = this.ageRangeConverter.mapAgeRangeFromAPI(this.user);

      //if the user has no body type preferences, set them all checked
      if (response.bodyTypePreference == null || response.bodyTypePreference.length < 1) {
        this.user.bodyTypePreferenceRaw = this.userHelper.setAllBodyTypes();
      } else {
        this.user.bodyTypePreferenceRaw = this.userHelper.bodyTypeArrayToObj(this.user.bodyTypePreference);
      }
    });
  }


}
