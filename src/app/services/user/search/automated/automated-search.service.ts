import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';
import { SearchResult } from 'src/app/models/search';

@Injectable({
  providedIn: 'root'
})
export class AutomatedSearchService {

  constructor(private auth:AuthService) { }

  search():Observable<any>{
    return this.auth.request(
      "get",
      '/users/search/automated'
    );
  }
}
