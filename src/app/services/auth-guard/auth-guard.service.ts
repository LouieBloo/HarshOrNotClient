import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService,private router: Router) { }

  canActivate(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
