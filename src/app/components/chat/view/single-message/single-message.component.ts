import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {


  @Input() message:any;
  isMyMessage:boolean;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    console.log(this.message);
    this.isMyMessage = this.auth.getUserID() == this.message.author ? true : false;
  }

}
