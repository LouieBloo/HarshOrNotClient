import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Photos } from '../../../models/photos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private auth:AuthService) { }

  fetchMyPhotos():Observable<Photos>{
    return this.auth.request(
      "post",
      '/users/photos/getMine'
    );
  }

  uploadNewPhoto(params):Observable<Photos>{
    return this.auth.request(
      "post",
      '/users/photos/upload',
      params
    )
  }

  deletePhoto(photoKey):Observable<Photos>{
    return this.auth.request(
      "post",
      '/users/photos/delete',
      {key:photoKey}
    )
  }

  swapPhotos(key1,key2):Observable<Photos>{
    return this.auth.request(
      "post",
      '/users/photos/swap',
      {key1:key1,key2:key2}
    )
  }

  getProfilePhoto(userID):Observable<Photos>{
    return this.auth.request(
      "post",
      '/users/photos/getProfile',
      {target:userID}
    )
  }
}
