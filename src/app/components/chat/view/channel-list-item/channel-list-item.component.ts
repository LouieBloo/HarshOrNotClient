import { Component, OnInit, Input } from '@angular/core';
import { ChannelListItem } from '../../../../models/chat/channel-list-item';

@Component({
  selector: 'app-channel-list-item',
  templateUrl: './channel-list-item.component.html',
  styleUrls: ['./channel-list-item.component.css']
})
export class ChannelListItemComponent implements OnInit {

  @Input() channel:ChannelListItem;
  constructor() { }

  ngOnInit() {
  }

}
