import { Injectable } from '@angular/core';
import { Client } from 'twilio-chat';
import { AuthService } from '../../auth/auth.service';
import { Observable, BehaviorSubject } from '../../../../../node_modules/rxjs';
import { ChannelListItem } from '../../../models/chat/channel-list-item';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  allChannels: ChannelListItem[] = [];//main source of channel info
  public channelEmitter = new BehaviorSubject(this.allChannels);//used to emit to listeners when new channels have been added

  channelLookupTimer:any;//for when channels are being added quickly, dont spam twilio api

  client: any;
  token: string;

  constructor(private auth: AuthService) {
    //console.log("take off storage clear!");
    //localStorage.clear();
    this.startup();
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
        //console.log("data: ", data);
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
      let index = this.allChannels.indexOf(channel)
      if (index === -1) {
        this.allChannels.push(channel);//add to our stored channels

        if (this.channelLookupTimer) {//reset timer if it was already set
          clearTimeout(this.channelLookupTimer);
        }
        this.channelLookupTimer = setTimeout(() => {//this is used so we dont spam parseChannels when a lot of channels are being added at once
          this.parseChannels(this.allChannels);
        }, 300);//todo, don't use timers
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
      console.log('Channel updates: ' + channel.sid);
    });
  }

  //fetches all users and the user descriptors on all the channels
  //also keeps our user at the back of the members array
  async parseChannels(channelsToParse: any[]) {
    this.allChannels = await Promise.all(channelsToParse.map(async (ch) => {
      let members = await ch.getMembers();

      ch.members = [];
      await Promise.all(members.map(async (mem) => {
        let desc = await mem.getUserDescriptor();
        if(mem.identity == this.auth.getUserID())
        {
          ch.members.push(desc);//keep our user at back of array
        }
        else{
          ch.members.unshift(desc);
        }
      }))

      return ch;
    }));

    this.channelEmitter.next(this.allChannels);//alert any listeners of new channel data
  }
}
