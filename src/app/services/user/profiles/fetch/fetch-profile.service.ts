import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from '../../../../../../node_modules/rxjs';
import { User } from '../../../../models/user';


@Injectable({
  providedIn: 'root'
})
export class FetchProfileService {

  constructor(private auth:AuthService) { }


  public fetchMyself():Observable<User>{
    return this.auth.request("post","/users/profiles/mine");
  }

  public fetchUser(userID:string):Observable<User>{
    return this.auth.request("post","/users/profiles/view",{_id:userID});
  }
}
