import { Component, OnInit, Input } from '@angular/core';
import { ChannelListItem } from '../../../../models/chat/channel-list-item';
import { Router } from '../../../../../../node_modules/@angular/router';
import { PhotosService } from '../../../../services/user/photos/photos.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ChatService } from 'src/app/services/user/chat/chat.service';
import { ChannelSnippet } from 'src/app/models/chat/chat';

@Component({
  selector: 'app-channel-list-item',
  templateUrl: './channel-list-item.component.html',
  styleUrls: ['./channel-list-item.component.css']
})
export class ChannelListItemComponent implements OnInit {

  @Input() channel: any;

  user: ChannelSnippet;
  lastMessage: any;
  lastAuthorName: string;
  unread: boolean = false;

  constructor(private auth: AuthService, private router: Router, private chat: ChatService) { }

  ngOnInit() {

    //fetch users profile info
    this.chat.getChannelInfo(this.channel.memberInfo[0].identity).subscribe(result => {
      if (result && !result.error) {
        console.log(result);
        this.user = result;
      }
    });



    //get channels last message
    this.channel.getMessages().then((messages) => {
      if (messages && messages.items && messages.items.length > 0) {
        this.lastMessage = messages.items[messages.items.length - 1];
        if (this.auth.getUserID() == this.lastMessage.author) {
          this.lastAuthorName = "You";
        } else {
          this.lastAuthorName = this.channel.memberInfo[0].friendlyName;
        }
      }
    })

    //get last unconsumedMessage so we can color the item if its read or not
    this.channel.getMessagesCount().then(totalCount => {
      this.channel.getUnconsumedMessagesCount().then((unconsumedCount) => {
        if (unconsumedCount != null && (unconsumedCount > 0)) {
          this.unread = true;
        } else if (unconsumedCount == null && totalCount) {
          this.unread = true;
        }
      })
    })

  }

  //navigate to the full channel view
  clicked() {
    if (this.channel) {
      this.router.navigateByUrl('/messaging/channel/' + this.channel.sid);
    }
  }

}
