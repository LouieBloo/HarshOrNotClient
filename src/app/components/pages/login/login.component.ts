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
      if(result.token && !this.error){
        this.router.navigateByUrl('/');
      }else if(result.error){
        if(result.error.email){
          this.error = result.error.email.msg;
        }else{
          this.error = result.error;
        }
      }
    });
  }

}
