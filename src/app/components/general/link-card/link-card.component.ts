import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css']
})
export class LinkCardComponent implements OnInit {

  @Input() link:string;
  @Input() imgUrl:string;
  @Input() linkHeader:string;
  @Input() linkBody:string;

  constructor() { }

  ngOnInit() {
  }

}
