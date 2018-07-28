export interface UserDetails{
  _id:string;
  email:string;
  name:string;
  exp:number;
  iat:number;
}

export interface TokenResponse{
  token:string;
  _id:string;
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
  birthday:string;
  gender:string;
  bodyType:string;
  preference:string;
}

