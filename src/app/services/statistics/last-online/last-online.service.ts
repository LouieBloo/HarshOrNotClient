import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LastOnlineService {

  timeInMinutesToTriggerAPICall: number = 5;
  lastHitAPI: Date;

  constructor(private auth: AuthService) { }



  public pageClicked() {
    if (this.auth.isLoggedIn()) {
      if (this.lastHitAPI) {
        let timeSinceLastUpdateInMinutes = ((new Date().getTime() - this.lastHitAPI.getTime()) / (1000 * 60));
        if (timeSinceLastUpdateInMinutes >= this.timeInMinutesToTriggerAPICall) {
          this.sendUserActivityToAPI();
        }
      } else {
        this.sendUserActivityToAPI();
      }
    }
  }

  sendUserActivityToAPI() {
    this.lastHitAPI = new Date();
    this.auth.request("post", "/statistics/logUserActivity").subscribe(result => {
      //do nothing with result unless its an error
      if (result.error) {
        console.log("Error logging user activity: ", result.error);
      }
    })
  }
}
