import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails, TokenPayload, TokenResponse, RegisterDetails } from '../../models/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import{ environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private _id:string;

  constructor(private http: HttpClient,private router: Router) { }

  private saveToken(token:string,_id:string):void{
    localStorage.setItem('mean-token',token);
    this.token = token;

    localStorage.setItem('_id',_id);
    this._id = _id;
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserID():string{
    if(!this._id){
      this._id = localStorage.getItem('_id');
    }
    return this._id;
  }

  public logout():void{
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  public getUserDetails():UserDetails{
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }else{
      return null;
    }
  }

  public isLoggedIn():boolean{
    const user = this.getUserDetails();
    if(user){
      return user.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }

  public request(method: 'post'|'get',url,params?:any): Observable<any>{
    let base;
    if(method === 'post'){
      if(this.isLoggedIn()){
        base = this.http.post(environment.api + url,params,{headers:{Authorization: `Bearer ${this.getToken()}`}});//add token to every post request
      }
      else{
        base = this.http.post(environment.api + url,params);
      }
    }else{
      base = this.http.get(environment.api + url,{headers:{Authorization: `Bearer ${this.getToken()}`}});
    }

    const request = base.pipe(
      map((data:TokenResponse)=>{
        if(data.token){
          this.saveToken(data.token,data._id);
        }

        return data;
      })
    )

    return request;
  }

  public login(user:TokenPayload):Observable<any>{
    return this.request('post','/users/login',user);
  }

  public register(registerDetails:RegisterDetails):Observable<any>{
    return this.request('post','/users/register',registerDetails);
  }
}
