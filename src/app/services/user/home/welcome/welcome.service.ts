import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private auth:AuthService) { }

  getWelcomeInfo():Observable<User>{
    return this.auth.request(
      "post",
      '/users/home/welcome'
    );
  }
}
