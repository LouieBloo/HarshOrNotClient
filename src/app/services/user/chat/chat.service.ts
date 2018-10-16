import { Injectable } from '@angular/core';
import { Client } from 'twilio-chat';
import { AuthService } from '../../auth/auth.service';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  client: any;
  token: string;

  constructor(private auth: AuthService) {
    console.log("take off storage clear!");
    localStorage.clear();
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
    if (!this.getToken()) {
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
    } else {
      this.connectClient()
    }
  }

  connectClient() {
    Client.create(this.getToken())
      .then((data) =>{
        console.log("data: ", data);
        this.client = data;
        //console.log(this.client.user.);
        this.client.getSubscribedChannels().then(function(paginator) {
          for (let i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            console.log('Channel: ' + channel.friendlyName);
          }
        });
      })
      .catch(err => {
        console.log("err: ", err);
      })

  }
}
