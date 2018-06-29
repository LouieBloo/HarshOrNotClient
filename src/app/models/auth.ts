export interface UserDetails{
  _id:string;
  email:string;
  name:string;
  exp:number;
  iat:number;
}

export interface TokenResponse{
  token:string;
}

export interface TokenPayload{
  email:string;
  password:string;
  name?:string;
}

export interface RegisterDetails{
  name:string;
  email:string;
  password:string;
  age:number;
  gender:string;
  preference:string;
}