import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
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
  isLoading: boolean = true;

  messageCallback: any;

  textAreaMessage: string;

  pageHeight: number;

  constructor(private activatedRoute: ActivatedRoute, private chat: ChatService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.setPageHeight();

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
                this.isLoading = false;
                if (messages && messages.items && messages.items.length > 0) {
                  this.messages = messages.items;

                  setTimeout(() => {//this is a jank timeout because it wont scroll if we fire it right away

                    this.scrollToBottom();
                  }, 300)

                  this.updateLastSeen();
                }
              })


              this.messageCallback = (message) => {
                this.messages.push(message);
                this.scrollToBottom();
                this.updateLastSeen();
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
    if (this.activeChannel && this.textAreaMessage && this.textAreaMessage.length > 0) {
      this.activeChannel.sendMessage(this.textAreaMessage).then(data => {
        this.textAreaMessage = "";
        this.scrollToBottom();
        this.changeDetectorRef.detectChanges();
      }).catch(err => {
        console.log("ERROR");
        console.log(err);
      });
    }
  }

  //set last consumed index
  updateLastSeen() {
    if (this.messages && this.messages.length > 0) {
      this.activeChannel.setAllMessagesConsumed().then(data=>{
      });
    }
  }

  textAreaEnterHandler(event) {
    if (event.keyCode == 13) {//enter button
      event.preventDefault();
      this.addMessage();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setPageHeight();
  }

  //sets the height of the scroll container
  setPageHeight() {
    this.pageHeight = window.innerHeight - 65;
  }
}
