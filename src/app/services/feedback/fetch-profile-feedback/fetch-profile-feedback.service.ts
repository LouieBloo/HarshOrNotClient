import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from '../../../../../node_modules/rxjs';
import { User } from '../../../models/user';
import { ProfileFeedback } from 'src/app/models/feedback';



@Injectable({
  providedIn: 'root'
})
export class FetchProfileFeedbackService {

  constructor(private auth:AuthService) { }


  public fetchProfileFeedback(params:ProfileFeedback):Observable<ProfileFeedback>{
    return this.auth.request("post","/feedback/profile-feedback/get",params);
  }

  public addProfileFeedback(params:ProfileFeedback):Observable<ProfileFeedback>{
    return this.auth.request("post","/feedback/profile-feedback/add",params);
  }
}
