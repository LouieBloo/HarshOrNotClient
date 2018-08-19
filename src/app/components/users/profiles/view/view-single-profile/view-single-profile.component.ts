import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import { FetchProfileService } from '../../../../../services/user/profiles/fetch/fetch-profile.service';
import { User } from '../../../../../models/user';
import {SlideshowModule} from 'ng-simple-slideshow';
import { FetchProfileFeedbackService } from '../../../../../services/feedback/fetch-profile-feedback/fetch-profile-feedback.service';
import { ProfileFeedback } from '../../../../../models/feedback';

@Component({
  selector: 'app-view-single-profile',
  templateUrl: './view-single-profile.component.html',
  styleUrls: ['./view-single-profile.component.css']
})
export class ViewSingleProfileComponent implements OnInit {


  //user info
  @Input() userID:string;
  user:User;

  //feedback stuff
  feedback:ProfileFeedback={target:"",feedback:""};
  formValid:boolean = false;
  canEditForm:boolean = false;

  constructor(
    private fetchProfileService:FetchProfileService,
    private fetchFeedbackService:FetchProfileFeedbackService
  ) {

  }


  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.fetchUserInfo();
  }

  //calls the services that fetch user info and feedback
  fetchUserInfo(){
    if(this.userID){
      this.fetchProfileService.fetchUser(this.userID).subscribe(result=>{
        if(result && !result.error){

          result.photos = this.applyPhotoFilter(result.photos);
          this.user = result;
          this.user.preference = this.user.preference.replace("Female","women").replace("Male","men").replace("Both","women and men");
        }
      });

      this.fetchFeedbackService.fetchProfileFeedback({target:this.userID}).subscribe(result=>{
        if(result && !result.error){
          this.feedback = result
          this.canEditForm = false;
        }else{
          this.canEditForm = true;
        }
      })
    }
  }

  applyPhotoFilter(photoArr:string[]):string[]{
    if(!photoArr || photoArr.length < 1){
      return null;
    }else{
      let result = [];
      photoArr.forEach((url)=>{
        result.push(url.replace("filter","adaptive-fit-in/750x750"));
      })
      return result;
    }
  }

  //feedback button is pressed
  feedbackSubmitted(){
    this.feedback.target = this.userID;
    this.fetchFeedbackService.addProfileFeedback(this.feedback).subscribe(result=>{
      if(result && !result.error){
        this.feedback = result;
        this.canEditForm = false;
      }else{

      }
    })
  }

  //when the feedback text area is receiving letters
  //make sure the user has enough in it to submit
  textAreaChanged(event:string){
    if(event.length > 10){
      this.formValid = true;
      return;
    }
    this.formValid= false;
  }
}
