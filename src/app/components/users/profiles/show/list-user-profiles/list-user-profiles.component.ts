import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-list-user-profiles',
  templateUrl: './list-user-profiles.component.html',
  styleUrls: ['./list-user-profiles.component.css']
})
export class ListUserProfilesComponent implements OnInit {


  @Input() inputUsers:User[];

  constructor() { }

  ngOnInit() {

  }

}
