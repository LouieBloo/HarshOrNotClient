import { Injectable } from '@angular/core';
import { SupportFeedback } from 'src/app/models/support/support';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupportFeedbackService {

  constructor(private auth:AuthService) { }

  sendFeedback(feedback:SupportFeedback):Observable<any>{
    return this.auth.request('post','/support/giveFeedback',feedback);
  }
}
