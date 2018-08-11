import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import { FetchProfileService } from '../../../../../services/user/profiles/fetch/fetch-profile.service';
import { User } from '../../../../../models/user';
import {SlideshowModule} from 'ng-simple-slideshow';

@Component({
  selector: 'app-view-single-profile',
  templateUrl: './view-single-profile.component.html',
  styleUrls: ['./view-single-profile.component.css']
})
export class ViewSingleProfileComponent implements OnInit {


  @Input() userID:string;
  user:User;

  constructor(private fetchProfileService:FetchProfileService) { }


  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    if(this.userID){
      this.fetchProfileService.fetchUser(this.userID).subscribe(result=>{
        if(result && !result.error){

          result.photos = this.applyPhotoFilter(result.photos);
          this.user = result;
          this.user.preference = this.user.preference.replace("Female","women").replace("Male","men").replace("Both","women and men");
          console.log(result.photos[0]);
          console.log(this.user);
        }
      });
    }
  }

  applyPhotoFilter(photoArr:string[]):string[]{
    if(!photoArr || photoArr.length < 1){
      return [];
    }else{
      let result = [];
      photoArr.forEach((url)=>{
        result.push(url.replace("filter","adaptive-fit-in/750x750"));
      })
      return result;
    }
  }

}
