import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterDetails } from '../../../models/auth';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerDetails:RegisterDetails = {name:"",email:"",password:"",birthday:"2000-01-01",gender:"Female",preference:"Male",bodyType:""};
  error:any;

  @ViewChild('openRegisterModal') openRegisterModal:ElementRef;
  
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.auth.register(this.registerDetails).subscribe(response=>{
      if(response.error){
        this.error = response.error;
      }
      else if(response.result && response.result == "Registered"){
        this.openRegisterModal.nativeElement.click();
      }
    })
  }

  //we need to make this a function so we can close the modal before we navigate away
  goToLoginPage(){
    this.openRegisterModal.nativeElement.click();
    this.router.navigateByUrl('/login');
  }
}
