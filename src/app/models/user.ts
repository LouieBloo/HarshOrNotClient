export interface User{
  name:string;
  email:string;
  bio?:string;
  birthday?:number;
  gender:string;
  age?:number;
  preference:string;
  location?:any;
  bodyType:string;
  range:number;
  ageRange:any;
  error?:string;
  _id?:string;
  photo?:string;
  photos?:string[];
  points?:{
    current?:number,
    total?:number
  }
}

