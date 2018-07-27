import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-photo-single',
  templateUrl: './update-photo-single.component.html',
  styleUrls: ['./update-photo-single.component.css']
})
export class UpdatePhotoSingleComponent implements OnInit {

  @Input() photoSrc:string;

  constructor() { }

  ngOnInit() {
  }

}
