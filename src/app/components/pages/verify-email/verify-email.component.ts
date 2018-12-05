import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserHelperService } from 'src/app/services/user/user-helper.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token:string;

  status:any = {
    loading:true,
    verified:false,
  }

  constructor(private userService:UserHelperService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      if(params && params.token){
        this.token = params.token;
        this.userService.verifyEmailToken(this.token).subscribe(result=>{
          if(result && result.result && result.result == "Verified"){
            this.status.verified = true;
          }
          this.status.loading = false;
        });
      }else{
        this.status.loading = false;  
      }
    })
  }
}
