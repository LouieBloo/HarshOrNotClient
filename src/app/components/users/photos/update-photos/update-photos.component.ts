import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { PhotosService } from '../../../../services/user/photos/photos.service';

@Component({
  selector: 'app-update-photos',
  templateUrl: './update-photos.component.html',
  styleUrls: ['./update-photos.component.css']
})
export class UpdatePhotosComponent implements OnInit {


  photos:[string];
  newPhoto:File;

  constructor(private photoService:PhotosService) {

  }

  ngOnInit() {
    this.photoService.fetchMyPhotos().subscribe(result=>{
      console.log("FROM PHOTOS:");
      console.log(result);
      this.photos = result.photos;
    })
  }

  submitUpload(){
    if(this.newPhoto != null){
      const uploadData = new FormData();
      uploadData.append('photo',this.newPhoto,this.newPhoto.name);
      this.photoService.uploadNewPhoto(uploadData).subscribe(result=>{
        console.log("Done uploading...");
        console.log(result);
      })  
    }
  }

  newPhotoFile(event){
    if(event.target.files!=null && event.target.files.length > 0){
      this.newPhoto = event.target.files[0];
    }
    else{
      this.newPhoto = null;
    }
  }

}
