import { Component, OnInit } from '@angular/core';
import { RegisterDetails } from '../../../models/auth';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerDetails:RegisterDetails = {name:"",email:"",password:"",birthday:"2000-01-01",gender:"Female",preference:"Male",bodyType:""};
  
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {
    
  }

  submit(){
    this.auth.register(this.registerDetails).subscribe(response=>{
      if(response.token){
        this.router.navigateByUrl('/');
      }
    })
  }
}
