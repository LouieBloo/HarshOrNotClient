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


  public fetchSingleProfileFeedback(params:ProfileFeedback):Observable<ProfileFeedback>{
    return this.auth.request("post","/feedback/profile-feedback/getSingle",params);
  }

  public addProfileFeedback(params:ProfileFeedback):Observable<ProfileFeedback>{
    return this.auth.request("post","/feedback/profile-feedback/add",params);
  }

  public getFeedbackAboutMe(limit:number):Observable<ProfileFeedback[]>{
    return this.auth.request("post","/feedback/profile-feedback/getFeedbackAboutMe",{limit:limit});
  }

  public getFeedbackIGave(limit:number):Observable<ProfileFeedback[]>{
    return this.auth.request("post","/feedback/profile-feedback/getFeedbackIGave",{limit:limit});
  }

  public unlockProfileFeedback(feedbackID:string):Observable<ProfileFeedback>{
    return this.auth.request("post","/feedback/profile-feedback/unlockFeedback",{feedbackID:feedbackID});
  }
}
