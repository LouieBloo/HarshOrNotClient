import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscoverableService {

  private discoverableAlert:any;
  public alertEmitter = new BehaviorSubject(this.discoverableAlert);//used to emit to listeners when discoverability changes

  constructor(private auth:AuthService) { }

  checkIfDiscoverable(){
    this.auth.request('get','/users/profiles/isDiscoverable').subscribe(result=>{
      if(result){
        this.discoverableAlert = result;
        this.discoverableAlert.description = this.getDescription();
        console.log(result);
        this.alertEmitter.next(this.discoverableAlert);
      }
    })
  }

  getDescription(){
    if(this.discoverableAlert.value){
      return null;
    }else if(!this.discoverableAlert.photos && !this.discoverableAlert.location){
      return "You need to add photos and set your location before your profile is discoverable";
    }else if(!this.discoverableAlert.location){
      return "You need to set your location before your profile is discoverable";
    }else if(!this.discoverableAlert.photos){
      return "You need to add photos before your profile is discoverable";
    }
  }
}
