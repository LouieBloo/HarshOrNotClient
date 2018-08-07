import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ModifyPhotoStatuses } from '../../../../../models/photos';

@Component({
  selector: 'app-update-photo-single',
  templateUrl: './update-photo-single.component.html',
  styleUrls: ['./update-photo-single.component.css']
})
export class UpdatePhotoSingleComponent implements OnInit {

  @Input() photoSrc:string;
  
  @Input() status?:ModifyPhotoStatuses;

  @Output() clickedEmitter = new EventEmitter<ModifyPhotoStatuses>();
  
  constructor(private auth:AuthService) { 
  }

  ngOnInit() {
    
  }

  clicked(){
    this.clickedEmitter.emit(this.status);
  }

}
