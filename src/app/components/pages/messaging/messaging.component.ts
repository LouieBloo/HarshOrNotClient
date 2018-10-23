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
  channelLookupTimer: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    //setup listener to handle channel changes
    this.chat.channelEmitter.subscribe(ch => {
      if (ch && ch.length > 0) {
        this.channels = ch;
      }
    })
  }

  ngOnDestroy() {
    this.chat.channelEmitter.unsubscribe();
  }

  

}
