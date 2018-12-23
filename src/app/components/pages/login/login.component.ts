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

  showingLoginInput:boolean = false;

  rememberMeEmailKey:string = "rememberMeEmail";
  rememberMe:boolean = false;

  

  constructor(private auth:AuthService,private router: Router) { }

  //see if there is an email stored
  ngOnInit() {
    this.loadSavedEmail();
  }



  loginButtonClicked(){
    if(this.showingLoginInput){
      this.submit();
    }else{
      this.showingLoginInput = !this.showingLoginInput;
    }
  }

  submit(){
    this.auth.login(this.loginDetails).subscribe(result =>{
      if(result.token && !this.error){
        this.saveEmail();
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

  loadSavedEmail(){
    let email = localStorage.getItem(this.rememberMeEmailKey);
    if(email && email.length > 0){
      this.rememberMe = true;
      this.loginDetails.email = email;
    }
  }

  saveEmail(){
    if(this.rememberMe){
      localStorage.setItem(this.rememberMeEmailKey,this.loginDetails.email);
    }else{
      localStorage.removeItem(this.rememberMeEmailKey);
    }
  }

}
