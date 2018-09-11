import { Component, OnInit, Input, HostListener } from '@angular/core';
import { User } from '../../../../../../models/user';
import { Router } from '../../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-list-user-profile-single',
  templateUrl: './list-user-profile-single.component.html',
  styleUrls: ['./list-user-profile-single.component.css']
})
export class ListUserProfileSingleComponent implements OnInit {

  @Input() user:User;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.user.preference){
      this.user.preference = this.user.preference.replace("Female","women").replace("Male","men").replace("Both","women and men");
    }
  }

  @HostListener('click') onClick(){
    if(this.user && this.user._id){
      this.router.navigateByUrl('/profile/' + this.user._id);
    }
  }
}
