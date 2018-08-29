import { Component, OnInit, Input } from '@angular/core';
import { ProfileFeedback } from '../../../../models/feedback';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  @Input() feedback:ProfileFeedback;
  
  constructor() { }

  ngOnInit() {
  }

}
