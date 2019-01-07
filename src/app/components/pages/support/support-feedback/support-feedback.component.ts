import { Component, OnInit } from '@angular/core';
import { SupportFeedback } from 'src/app/models/support/support';
import { SupportFeedbackService } from 'src/app/services/support/support-feedback/support-feedback.service';

@Component({
  selector: 'app-support-feedback',
  templateUrl: './support-feedback.component.html',
  styleUrls: ['./support-feedback.component.css']
})
export class SupportFeedbackComponent implements OnInit {


  feedback:SupportFeedback = {
    type:"Bug",
    feedback:""
  };

  formValid = false;
  status:any = {
    loading:false,
    done:false
  }

  constructor(private supportFeedbackService:SupportFeedbackService) { }

  ngOnInit() {
  }

  submitFeedback(){
    if(this.feedback){
      this.status.loading = true;
      this.supportFeedbackService.sendFeedback(this.feedback).subscribe(result=>{
        if(result && result.result){
          this.status.done = true;
        }

        this.status.loading = false;
      })
    }
  }

  //make sure the user has enough in it to submit
  textAreaChanged(event: string) {
    if (event.length > 4) {
      this.formValid = true;
      return;
    }
    this.formValid = false;
  }

}
