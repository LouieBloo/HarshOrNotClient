import { Component, OnInit, Input } from '@angular/core';
import { ChannelListItem } from '../../../../models/chat/channel-list-item';
import { Router } from '../../../../../../node_modules/@angular/router';
import { PhotosService } from '../../../../services/user/photos/photos.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-channel-list-item',
  templateUrl: './channel-list-item.component.html',
  styleUrls: ['./channel-list-item.component.css']
})
export class ChannelListItemComponent implements OnInit {

  @Input() channel:any;

  photoURL:string;
  lastMessage:any;
  lastAuthorName:string;

  constructor(private auth:AuthService,private router:Router,private photoService:PhotosService) { }

  ngOnInit() {
    this.photoService.getProfilePhoto(this.channel.memberInfo[0].identity).subscribe(result=>{
      if(result && !result.error && result.photoURLS && result.photoURLS.length > 0){
        this.photoURL = result.photoURLS[0];
      }
    });

    this.channel.getMessages().then((messages) => {
      if (messages && messages.items && messages.items.length > 0) {
        this.lastMessage = messages.items[messages.items.length -1];
        if(this.auth.getUserID() == this.lastMessage.author){
          this.lastAuthorName = "You";
        }else{
          this.lastAuthorName = this.channel.memberInfo[0].friendlyName;
        }
      }
    })
  }

  clicked(){
    if(this.channel){
      this.router.navigateByUrl('/messaging/channel/' + this.channel.sid);
    }
  }

}
