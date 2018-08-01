import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from '../../../../../../node_modules/rxjs';
import { SearchQuery } from '../../../../models/search';
import { User } from '../../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AllSearchService {

  constructor(private auth:AuthService) { }

  searchAllUsers(query:SearchQuery):Observable<User[]>{
    return this.auth.request(
      "post",
      "/users/search/all",
      {query}
    )
  }
}
