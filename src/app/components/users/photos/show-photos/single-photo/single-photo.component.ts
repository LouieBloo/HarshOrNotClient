import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit {

  @Input() photoSrc:string;
  @Input() highlighted?:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
