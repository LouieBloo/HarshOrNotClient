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
    this.userID = "5b6e5eca00307e17d61b0def";
  }


}
