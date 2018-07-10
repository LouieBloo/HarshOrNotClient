import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from '../../../models/auth';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails:TokenPayload = {email:"",password:""};
  error:string;

  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.auth.login(this.loginDetails).subscribe(result =>{

      this.error = result.error;
      if(result.token && !this.error){
        this.router.navigateByUrl('/');
      }

    });
  }

}
