import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  public userID:string;

  constructor() { }

  ngOnInit() {
    this.userID = "5b6ba51b1d4ccf0fe787cf52";
  }


}
