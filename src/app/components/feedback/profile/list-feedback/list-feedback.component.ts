import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProfileFeedback } from '../../../../models/feedback';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  @Input() feedback:ProfileFeedback;

  paragraphExpanded:boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.feedback && this.feedback.preference){
      this.feedback.preference = this.feedback.preference.replace("Male","Men").replace("Female","Women").replace("Both","Both Men and Women");
    }
  }


}
