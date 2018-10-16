import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/user/chat/chat.service';
@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  constructor(private chat:ChatService) { }

  ngOnInit() {
    
  }

}
