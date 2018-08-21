import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  public userID:string;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    //this.userID = this.auth.getUserID();
    this.userID = "5b74f2a5c0c23a0312331dd4";
  }


}
