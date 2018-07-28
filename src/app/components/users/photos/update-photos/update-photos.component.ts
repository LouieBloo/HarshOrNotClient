import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { PhotosService } from '../../../../services/user/photos/photos.service';
import { Photos,ModifyPhotoStatuses } from '../../../../models/photos';
import { stat } from 'fs';

@Component({
  selector: 'app-update-photos',
  templateUrl: './update-photos.component.html',
  styleUrls: ['./update-photos.component.css']
})
export class UpdatePhotosComponent implements OnInit {

  
  private maximumNumberOfPhotos:number = 5;

  photos:Photos;
  photoURLS:[string];

  //photostatuses keep track of what photo is selected. If only 1 is selected, show delete
  //if 2, show swap
  photoStatuses:ModifyPhotoStatuses[] = [];
  activePhotoStatuses:number[] =[];//this just makes it a bit easier to keep track of which photo is selected. Usefull to not iterate over photostatuses all day

  tempImgSrc:string;
  error:string;

  newPhoto:File;

  

  constructor(private photoService:PhotosService) {
    this.clearPhotoStatuses();
  }

  ngOnInit() {
    this.photoService.fetchMyPhotos().subscribe(result=>{
      console.log(result);
      this.photos = result;
      this.photoURLS = this.photos.photoURLS;
    })
  }

  //actually make the server request
  submitUpload(){
    if(this.newPhoto != null){
      
      const uploadData = new FormData();
      uploadData.append('photo',this.newPhoto,this.newPhoto.name);

      this.photoService.uploadNewPhoto(uploadData).subscribe(result=>{
        this.photos = result;
        this.photoURLS = this.photos.photoURLS;
        this.tempImgSrc = null;

        this.clearPhotoStatuses();
        this.error = "";
      })  
    }
  }

  //when the photo input is changed, this gets called.
  //sets the photo that will be uploaded
  newPhotoFile(event:any){
    if(event.target.files!=null && event.target.files.length > 0){

      if(this.photos.photos.length >= this.maximumNumberOfPhotos){
        this.error = "Maximum " + this.maximumNumberOfPhotos + " photos!";
        
        return;
      }
      this.newPhoto = event.target.files[0];

      //for photo previewing
      var reader = new FileReader();
      reader.onload = (event:any)=>{
        this.tempImgSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      this.newPhoto = null;
      this.error = "";
    }
  }

  //whenever one of the photos is clicked, this function will get fired
  photoClicked(status:ModifyPhotoStatuses){
    console.log("Received in parent");
    //console.log(status);
    if(this.activePhotoStatuses.length >= 2 && !this.activePhotoStatuses.includes(status.index)){
      //this.activePhotoStatuses = []
      console.log(this.photoStatuses);
      this.activePhotoStatuses.forEach((e)=>{
        
        this.photoStatuses[e].highlighted = false;
      })
      this.activePhotoStatuses = [status.index];
    }
    else if(this.activePhotoStatuses.includes(status.index)){
      this.activePhotoStatuses.splice(this.activePhotoStatuses.indexOf(status.index),1);//remove from our indexing
      status.highlighted = false;
    }
    else{
      this.activePhotoStatuses.push(status.index);
      this.photoStatuses[status.index] = status;
      
      status.highlighted = true;
    }
  }

  clearPhotoStatuses(){
    this.photoStatuses = [];
    //create empty data for photoStatuses
    for(var i=0;i<this.maximumNumberOfPhotos;i++){
      this.photoStatuses.push({highlighted:false,showDeleteInterface:false,index:i});
    }
  }
}
