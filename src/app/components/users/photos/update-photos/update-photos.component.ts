import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { PhotosService } from '../../../../services/user/photos/photos.service';
import { Photos,ModifyPhotoStatuses } from '../../../../models/photos';

@Component({
  selector: 'app-update-photos',
  templateUrl: './update-photos.component.html',
  styleUrls: ['./update-photos.component.css']
})
export class UpdatePhotosComponent implements OnInit {

  
  private maximumNumberOfPhotos:number = 5;

  photos:Photos;
  //photostatuses keep track of what photo is selected. If only 1 is selected, show delete
  //if 2, show swap
  photoStatuses:ModifyPhotoStatuses[] = [];
  activePhotoStatuses:number[] =[];//this just makes it a bit easier to keep track of which photo is selected. Usefull to not iterate over photostatuses all day

  tempImgSrc:string;//used to show the image preview before uploading a pic
  error:string;

  newPhoto:File;//set when the user selects a photo. This will be the file uploaded when the user clicks upload

  showDeleteButton:boolean;
  showSwapButton:boolean;

  constructor(private photoService:PhotosService) {
    this.clearPhotoStatuses();
  }

  ngOnInit() {
    this.photoService.fetchMyPhotos().subscribe(result=>{
      this.photos = result;
    })
  }

  //actually make the server request
  submitUpload(){
    if(this.newPhoto != null){
      
      const uploadData = new FormData();
      uploadData.append('photo',this.newPhoto,this.newPhoto.name);

      this.photoService.uploadNewPhoto(uploadData).subscribe(result=>{
        this.photos = result;
        this.tempImgSrc = null;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.error = "";
      })  
    }
  }

  //when the photo input is changed, this gets called.
  //sets the photo that will be uploaded
  newPhotoFile(event:any){
    if(event.target.files!=null && event.target.files.length > 0){
      if(this.photos != null && this.photos.photos.length >= this.maximumNumberOfPhotos){
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
    if(this.activePhotoStatuses.length >= 2 && !this.activePhotoStatuses.includes(status.index)){//if 2 are already clicked, deslect them and select the new one
      this.activePhotoStatuses.forEach((e)=>{
        
        this.photoStatuses[e].highlighted = false;
      })
      this.activePhotoStatuses = [status.index];
      status.highlighted = true;
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

    this.checkDeleteAndSwapStatuses();
  }

  //delete the selected photo
  deletePhotoButtonClicked(){
    if(this.activePhotoStatuses.length == 1){
      this.photoService.deletePhoto(this.photos.photos[this.activePhotoStatuses[0]]).subscribe(result=>{
        this.photos = result;
        this.tempImgSrc = null;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.error = "";
      })
    }
  }

  //swap the two photos
  swapPhotoButtonClicked(){
    if(this.activePhotoStatuses.length == 2){
      this.photoService.swapPhotos(this.photos.photos[this.activePhotoStatuses[0]],this.photos.photos[this.activePhotoStatuses[1]]).subscribe(result=>{
        this.photos = result;
        this.tempImgSrc = null;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.error = "";
      })
    }
  }

  checkDeleteAndSwapStatuses(){
    //show or dont show the delete and swap button
    if(this.activePhotoStatuses.length == 1){
      this.showDeleteButton = true;
      this.showSwapButton = false;
    }
    else if(this.activePhotoStatuses.length ==2){
      this.showDeleteButton = false;
      this.showSwapButton = true;
    }
    else{
      this.showDeleteButton = false;
      this.showSwapButton = false;
    }
  }

  clearPhotoStatuses(){
    this.photoStatuses = [];
    this.activePhotoStatuses = [];
    //create empty data for photoStatuses
    for(var i=0;i<this.maximumNumberOfPhotos;i++){
      this.photoStatuses.push({highlighted:false,showDeleteInterface:false,index:i});
    }
  }
}
