import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { ChatService } from '../../../../services/user/chat/chat.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  activeChannel: any;
  channelSubscription: any;

  messages: any[] = [];
  @ViewChild('mainRow') private myScrollContainer: ElementRef;

  messageCallback:any;

  textAreaMessage:string;

  constructor(private activatedRoute: ActivatedRoute, private chat: ChatService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {//get parameters
      if (params && params.sid) {

        //subscribe for all chat channels, then get the one we are interested in
        this.channelSubscription = this.chat.channelEmitter.subscribe(channels => {
          if ((channels && channels.length > 0) && (!this.activeChannel || !this.activeChannel.sid)) {
            this.activeChannel = channels.filter(ch => ch.sid == params.sid);//find the one we want
            if (this.activeChannel && this.activeChannel.length > 0) {
              this.activeChannel = this.activeChannel[0];
              //fetch our initial messages
              this.activeChannel.getMessages().then((messages) => {
                console.log(messages)
                if (messages && messages.items && messages.items.length > 0) {
                  this.messages = messages.items;
                  this.scrollToBottom();
                }
              })

              
              this.messageCallback = (message)=>{
                console.log(message);
                this.messages.push(message);
                this.scrollToBottom();
              }
              //subscribe for any new messages
              this.activeChannel.on('messageAdded', this.messageCallback);
            }
          }
        })

      }
    })
  }

  ngOnDestroy() {
    if (this.activeChannel) {//unsubscribe from messages
      //for some reason this throws errors on occasion. TODO fix the errors
      //I think its coming from a channel that is not null, but also not valid
      try {
        this.activeChannel.removeListener('messageAdded', this.messageCallback);
      } catch (e) {
        console.log("Error removing listener: ", e);
      }
    }
    this.channelSubscription.unsubscribe();
  }

  addMessage() {
    if (this.activeChannel && this.textAreaMessage&& this.textAreaMessage.length > 0) {
      this.activeChannel.sendMessage(this.textAreaMessage).then(data => {
        console.log("DATA");
        console.log(data);
        this.textAreaMessage = "";
      }).catch(err => {
        console.log("ERROR");
        console.log(err);
      });
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
