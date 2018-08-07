import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeRangeService {

  constructor() { }

  //since the noui range uses an array, we have to map it to our ageRange objects min and max properties
  mapAgeRangeFromAPI(data):number[]{
    return [data.ageRange.min,data.ageRange.max];//have to set this manually
  }
  //set the correct age range for the api
  mapAgeRangeToAPI(ageRange:any){
    return {min:ageRange[0],max:ageRange[1]}
  }
}
