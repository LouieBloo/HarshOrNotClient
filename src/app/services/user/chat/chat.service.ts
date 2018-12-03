import { Injectable } from '@angular/core';
import { Client } from 'twilio-chat';
import { AuthService } from '../../auth/auth.service';
import { Observable, BehaviorSubject } from '../../../../../node_modules/rxjs';
import { ChannelListItem } from '../../../models/chat/channel-list-item';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  allChannels: any[] = [];//main source of channel info
  public channelEmitter = new BehaviorSubject(this.allChannels);//used to emit to listeners when new channels have been added

  client: any;
  token: string;

  constructor(private auth: AuthService) {
    //console.log("take off storage clear!");
    //localStorage.clear();
    //this.startup();
  }

  logout() {
    this.allChannels = [];
    this.client = null;
    this.token = null;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('twilio');
    }
    return this.token
  }

  //fetches token from api if it doesn't already exist, then starts the client
  startup() {
    this.auth.request(
      "post",
      '/users/chat/getToken',
      {
        device: "web"
      }
    )
      .subscribe(result => {
        if (result && result.twilioToken) {
          this.token = result.twilioToken;
          localStorage.setItem('twilio', this.token);
          this.connectClient();
        }
      });
  }

  connectClient() {
    //console.log("connecting client...", this.getToken());
    Client.create(this.getToken())
      .then((data) => {
        this.client = data;

        this.setupChannelListeners();
      })
      .catch(err => {
        console.log("err: ", err);
      })
  }

  setupChannelListeners() {
    // A channel has become visible to the Client
    this.client.on('channelAdded', (channel) => {
      console.log(channel);
      let index = this.allChannels.indexOf(channel)
      if (index === -1) {


        this.parseChannel(channel);
      }
    });
    // A channel is no longer visible to the Client
    this.client.on('channelRemoved', (channel) => {
      console.log('Channel removed: ' + channel.friendlyName);
      let index = this.allChannels.indexOf(channel)
      if (index !== -1) {
        this.allChannels.splice(index, 1);
      }
    });
    // A channel's attributes or metadata have changed.
    this.client.on('channelUpdated', (channel) => {
      console.log('Channel updates: ', channel.updateReasons);
      this.sortChannelsByLastMessageDate();
    });
  }

  //fetches all users and the user descriptors on all the channels
  //also keeps our user at the back of the members array
  async parseChannel(channel: any) {

    let descriptors = await channel.getUserDescriptors();
    channel.memberInfo = descriptors.state.items;
    //if our user is in the front of the desc array, move them to the back for easier access
    if (channel.memberInfo.length > 1 && channel.memberInfo[0].identity == this.auth.getUserID()) {
      let temp = channel.memberInfo[0];
      channel.memberInfo[0] = channel.memberInfo[1];
      channel.memberInfo[1] = temp;
    }

    //this.messageListener(channel);//setup message listener for each channel
    this.allChannels.push(channel);//add to our stored channels

    //sort
    this.sortChannelsByLastMessageDate();

    this.channelEmitter.next(this.allChannels);//alert any listeners of new channel data
  }

  sortChannelsByLastMessageDate() {
    //sort channels by last update time
    this.allChannels.sort((x, y) => {
      if (x.lastMessage && y.lastMessage) {
        return x.lastMessage.timestamp > y.lastMessage.timestamp ? -1 : x.lastMessage.timestamp < y.lastMessage.timestamp ? 1 : 0
      } else if (x.lastMessage) {
        return -1;
      } else if (y.lastMessage) {
        return 1;
      }
      return 1;
    });
  }

  addMessage(channel: any, message: string) {
    if (channel && message) {
      channel.sendMessage(message).then(data => {
        console.log("DATA");
        console.log(data);
      }).catch(err => {
        console.log("ERROR");
        console.log(err);
      });
    }
  }

  messageListener(channel) {
    channel.on('messageAdded', (message) => {
      console.log("New message!");
      console.log(message);
    })
  }
}
