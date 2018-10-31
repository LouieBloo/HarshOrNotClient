import { Component, OnInit, Input } from '@angular/core';
import { ChannelListItem } from '../../../../models/chat/channel-list-item';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-channel-list-item',
  templateUrl: './channel-list-item.component.html',
  styleUrls: ['./channel-list-item.component.css']
})
export class ChannelListItemComponent implements OnInit {

  @Input() channel:ChannelListItem;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  clicked(){
    if(this.channel){
      this.router.navigateByUrl('/messaging/channel/' + this.channel.sid);
    }
  }

}
