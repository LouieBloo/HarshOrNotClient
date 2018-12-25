import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { PhotosService } from '../../../../services/user/photos/photos.service';
import { Photos, ModifyPhotoStatuses } from '../../../../models/photos';
import { DiscoverableService } from 'src/app/services/user/profiles/discoverable/discoverable.service';

@Component({
  selector: 'app-update-photos',
  templateUrl: './update-photos.component.html',
  styleUrls: ['./update-photos.component.css']
})
export class UpdatePhotosComponent implements OnInit {


  maximumNumberOfPhotos: number = 5;

  photos: Photos;
  //photostatuses keep track of what photo is selected. If only 1 is selected, show delete
  //if 2, show swap
  photoStatuses: ModifyPhotoStatuses[] = [];
  activePhotoStatuses: number[] = [];//this just makes it a bit easier to keep track of which photo is selected. Usefull to not iterate over photostatuses all day

  error: string;

  newPhoto: File;//set when the user selects a photo. This will be the file uploaded when the user clicks upload

  //image cropper variables
  imageChangedEvent: any = '';
  cropperReady = false;

  //swap and delete buttons
  showDeleteButton: boolean;
  showSwapButton: boolean;

  //loading indicator
  uploading:boolean = false;

  constructor(private photoService: PhotosService, private discoverable: DiscoverableService) {
    this.clearPhotoStatuses();
  }

  ngOnInit() {
    this.photoService.fetchMyPhotos().subscribe(result => {
      this.photos = result;
    })
  }

  //actually make the server request
  submitUpload() {
    if (this.newPhoto != null) {
      this.uploading = true;

      const uploadData = new FormData();
      uploadData.append('photo', this.newPhoto, this.newPhoto.name);

      this.photoService.uploadNewPhoto(uploadData).subscribe(result => {
        this.photos = result;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.cropperReady = false;
        this.error = "";

        //since we added a photo, check discoverability
        this.discoverable.checkIfDiscoverable();

        this.uploading = false;
      })
    }
  }


  //whenever one of the photos is clicked, this function will get fired
  photoClicked(status: ModifyPhotoStatuses) {
    if (this.activePhotoStatuses.length >= 2 && !this.activePhotoStatuses.includes(status.index)) {//if 2 are already clicked, deslect them and select the new one
      this.activePhotoStatuses.forEach((e) => {

        this.photoStatuses[e].highlighted = false;
      })
      this.activePhotoStatuses = [status.index];
      status.highlighted = true;
    }
    else if (this.activePhotoStatuses.includes(status.index)) {
      this.activePhotoStatuses.splice(this.activePhotoStatuses.indexOf(status.index), 1);//remove from our indexing
      status.highlighted = false;
    }
    else {
      this.activePhotoStatuses.push(status.index);
      this.photoStatuses[status.index] = status;

      status.highlighted = true;
    }

    this.checkDeleteAndSwapStatuses();
  }


  //when the user has a picture in the input
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  //fired when the image is cropped
  imageCroppedFile(image: any) {
    this.newPhoto = image;
  }
  //fired when image is initially loaded
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed() {
    console.log('Load failed');
  }

  //delete the selected photo
  deletePhotoButtonClicked() {
    if (this.activePhotoStatuses.length == 1) {
      this.photoService.deletePhoto(this.photos.photos[this.activePhotoStatuses[0]]).subscribe(result => {
        this.photos = result;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.error = "";

        //since we deleted a photo, check discoverability
        this.discoverable.checkIfDiscoverable();
      })
    }
  }

  //swap the two photos
  swapPhotoButtonClicked() {
    if (this.activePhotoStatuses.length == 2) {
      this.photoService.swapPhotos(this.photos.photos[this.activePhotoStatuses[0]], this.photos.photos[this.activePhotoStatuses[1]]).subscribe(result => {
        this.photos = result;

        this.clearPhotoStatuses();
        this.checkDeleteAndSwapStatuses();
        this.error = "";
      })
    }
  }

  checkDeleteAndSwapStatuses() {
    //show or dont show the delete and swap button
    if (this.activePhotoStatuses.length == 1) {
      this.showDeleteButton = true;
      this.showSwapButton = false;
    }
    else if (this.activePhotoStatuses.length == 2) {
      this.showDeleteButton = false;
      this.showSwapButton = true;
    }
    else {
      this.showDeleteButton = false;
      this.showSwapButton = false;
    }
  }

  clearPhotoStatuses() {
    this.photoStatuses = [];
    this.activePhotoStatuses = [];
    //create empty data for photoStatuses
    for (var i = 0; i < this.maximumNumberOfPhotos; i++) {
      this.photoStatuses.push({ highlighted: false, showDeleteInterface: false, index: i });
    }
  }
}
