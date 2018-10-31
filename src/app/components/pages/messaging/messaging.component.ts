import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/user/chat/chat.service';
import { ChannelListItem } from '../../../models/chat/channel-list-item';
import { async } from '../../../../../node_modules/@types/q';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  channels: ChannelListItem[] = [];
  channelSubscription: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    //setup listener to handle channel changes
    this.channelSubscription = this.chat.channelEmitter.subscribe(ch => {
      if (ch && ch.length > 0) {
        this.channels = ch;
      }
    })
  }

  ngOnDestroy() {
    this.channelSubscription.unsubscribe();
  }


  addMessage() {
    this.chat.addMessage(this.channels[0], this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
  }

  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}
