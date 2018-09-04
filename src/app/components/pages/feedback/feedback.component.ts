import { Component, OnInit } from '@angular/core';
import { FetchProfileFeedbackService } from '../../../services/feedback/fetch-profile-feedback/fetch-profile-feedback.service';
import { ProfileFeedback } from '../../../models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackAboutMe:ProfileFeedback[] = [];
  feedbackIGave:ProfileFeedback[] = [];

  constructor(private fetchProfileFeedbackService:FetchProfileFeedbackService) { }

  ngOnInit() {
    this.getAboutMeFeedback(20);
    this.getIGaveFeedback(20);
  }

  getAboutMeFeedback(limit:number){
    this.fetchProfileFeedbackService.getFeedbackAboutMe(limit).subscribe(result=>{
      if(result && result.length >0 && !result[0].error){
        this.feedbackAboutMe = result;
        console.log(result);
      }
    })
  }

  getIGaveFeedback(limit:number){
    this.fetchProfileFeedbackService.getFeedbackIGave(limit).subscribe(result=>{
      if(result && result.length >0 && !result[0].error){
        this.feedbackIGave = result;
        console.log(result);
      }
    })
  }

}
