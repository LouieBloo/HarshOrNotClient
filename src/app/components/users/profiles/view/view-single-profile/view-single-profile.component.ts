import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FetchProfileService } from '../../../../../services/user/profiles/fetch/fetch-profile.service';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-view-single-profile',
  templateUrl: './view-single-profile.component.html',
  styleUrls: ['./view-single-profile.component.css']
})
export class ViewSingleProfileComponent implements OnInit {


  @Input() userID:string;
  user:User;

  constructor(private fetchProfileService:FetchProfileService) { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    if(this.userID){
      this.fetchProfileService.fetchUser(this.userID).subscribe(result=>{
        if(result && !result.error){
          this.user = result;
          console.log(this.user);
        }
      });
    }
  }

}
