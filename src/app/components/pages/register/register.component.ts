import { Component, OnInit } from '@angular/core';
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
  
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {
    
  }

  submit(){
    this.auth.register(this.registerDetails).subscribe(response=>{
      console.log(response);
      if(response.error){
        this.error = response.error;
      }
      else if(response.token){
        //this.router.navigateByUrl('/');
      }
    })
  }
}
