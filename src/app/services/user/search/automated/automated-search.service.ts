import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from '../../../../../../node_modules/rxjs';
import { User } from '../../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AutomatedSearchService {

  constructor(private auth:AuthService) { }

  search(offset:number = 0,limit:number = 20):Observable<User>{
    return this.auth.request(
      "post",
      '/users/search/automated',
    {
      offset:offset,
      limit:limit
    });
  }
}
