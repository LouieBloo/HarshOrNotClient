export interface User{
    name:string;
    email:string;
    bio?:string;
    birthday?:number;
    gender:string;
    preference:string;
    location?:any;

    error?:string;
  }