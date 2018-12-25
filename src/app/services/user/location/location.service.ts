import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  startup(){
    this.getLocation();
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(position=>{
      console.log(position);
    })
  }
}
