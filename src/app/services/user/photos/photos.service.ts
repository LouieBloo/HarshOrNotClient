import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Photos } from '../../../models/user';
import { Observable } from '../../../../../node_modules/rxjs';

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

  uploadNewPhoto(params):Observable<any>{
    return this.auth.request(
      "post",
      '/users/photos/upload',
      params
    )
  }
}
