import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DiscoverableService } from '../profiles/discoverable/discoverable.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private auth: AuthService,private discoverable:DiscoverableService) { }

  startup() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      if(position && position.coords && position.coords.latitude && position.coords.longitude){
        this.updateLocation(position.coords);
      }
    },error=>{
      this.discoverable.checkIfDiscoverable();
    });
  }

  updateLocation(newCoordinates: any) {
    this.auth.request('post', "/users/location/setLocation",
      {
        latitude: newCoordinates.latitude,
        longitude: newCoordinates.longitude
      }
    ).subscribe(result=>{
      if(result && result.result){
        this.discoverable.checkIfDiscoverable();
      }
    })
  }
}
