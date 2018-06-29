import { Component, OnInit } from '@angular/core';
import { RegisterDetails } from '../../../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerDetails:RegisterDetails = {name:"",email:"",password:"",age:18,gender:"Female",preference:"Male"};

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log("Submitted...");
    console.log(this.registerDetails);
  }
}
