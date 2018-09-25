import { Injectable } from '@angular/core';
import { Match } from '../../../models/match';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private auth:AuthService) { }

  getMatches():Observable<Match[]>{
    return this.auth.request(
      "post",
      '/users/matches/getMatches'
    );
  }

  getDenials():Observable<Match[]>{
    return this.auth.request(
      "post",
      '/users/matches/getDenials'
    );
  }

  getMatchQueue():Observable<Match[]>{
    return this.auth.request(
      "post",
      '/users/matches/getMatchQueue'
    );
  }
}
