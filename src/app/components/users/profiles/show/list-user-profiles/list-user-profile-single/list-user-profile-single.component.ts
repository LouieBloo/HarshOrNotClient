import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../../models/user';

@Component({
  selector: 'app-list-user-profile-single',
  templateUrl: './list-user-profile-single.component.html',
  styleUrls: ['./list-user-profile-single.component.css']
})
export class ListUserProfileSingleComponent implements OnInit {

  @Input() user:User;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.user.preference){
      this.user.preference = this.user.preference.replace("Female","women").replace("Male","men").replace("Both","women and men");
    }
  }

}
