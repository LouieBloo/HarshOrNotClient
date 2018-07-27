export interface User{
  name:string;
  email:string;
  bio?:string;
  birthday?:number;
  gender:string;
  preference:string;
  location?:any;
  bodyType:string;
  range:number;
  ageRange:any;
  error?:string;
  _id?:string;
}

export interface Photos{
  photos:[string];
}