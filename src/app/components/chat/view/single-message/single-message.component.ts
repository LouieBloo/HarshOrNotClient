import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {


  @Input() message:any;

  constructor() { }

  ngOnInit() {
  }

}
