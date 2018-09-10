import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ProfileFeedback } from '../../../../models/feedback';
import { FetchProfileFeedbackService } from '../../../../services/feedback/fetch-profile-feedback/fetch-profile-feedback.service';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  @Input() feedback:ProfileFeedback;
  isAboutMe:boolean = true;
  paragraphExpanded:boolean = false;

  @ViewChild('closeModalButton') closeModalButton: ElementRef;
  
  constructor(private feedbackService:FetchProfileFeedbackService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.feedbackUpdated();
  }

  redeemClicked(){
    this.feedbackService.unlockProfileFeedback(this.feedback._id).subscribe(result=>{
      console.log(result);
      if(!result.error){
        this.feedback = result;
        this.feedbackUpdated();

        this.closeModalButton.nativeElement.click();
      }
    })
  }

  feedbackUpdated(){
    if(this.feedback && this.feedback.user){
      this.feedback.user.preference = this.feedback.user.preference.replace("Male","Men").replace("Female","Women").replace("Both","Both Men and Women");

      if(!this.feedback.target && !this.feedback.source){
        this.isAboutMe = true;
      }else if(this.feedback.target){
        this.isAboutMe = false;
      }
    }
  }
}
