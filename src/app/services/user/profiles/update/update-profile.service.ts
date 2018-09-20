import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private auth:AuthService) { }

  public updatePreferences(user:User):Observable<User>{
    console.log(user);
    return this.auth.request("post","/users/profiles/update/preferences",user);
  }
}
