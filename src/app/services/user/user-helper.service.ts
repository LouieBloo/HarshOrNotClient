import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {

  constructor() { }

  //takes in bodyTypeRaw and returns an array of strings representing that object
  //todo, makes this better
  bodyTypeObjToArray(bodyObject): string[] {
    let returnObj: string[] = [];
    if (bodyObject.athletic) {
      returnObj.push("Athletic");
    }
    if (bodyObject.thin) {
      returnObj.push("Thin");
    }
    if (bodyObject.average) {
      returnObj.push("Average");
    }
    if (bodyObject.plus) {
      returnObj.push("Plus");
    }
    if (bodyObject.veryPlus) {
      returnObj.push("Very Plus");
    }

    return returnObj;
  }

  //takes in an array of body types, returns a object with those properties set. Used so the toggles are easier
  bodyTypeArrayToObj(bodyArray: string[]): any {
    let returnObj:any = {};

    for (let bodyType of bodyArray) {
      switch (bodyType) {
        case "Athletic":
          returnObj.athletic = true;
          break;
        case "Thin":
          returnObj.thin = true;
          break;
        case "Average":
          returnObj.average = true;
          break;
        case "Plus":
          returnObj.plus = true;
          break;
        case "Very Plus":
          returnObj.veryPlus = true;
          break;
      }
    }
    console.log(returnObj);
    return returnObj;
  }

  setAllBodyTypes(): any {
    let returnObj = {
      athletic: true,
      thin: true,
      average: true,
      plus: true,
      veryPlus: true
    };
    return returnObj;
  }
}
