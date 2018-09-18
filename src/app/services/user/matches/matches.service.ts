import { Injectable } from '@angular/core';
import { ProfileMatch } from '../../../models/feedback';
import { AuthService } from '../../auth/auth.service';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private auth:AuthService) { }

  getMatches():Observable<ProfileMatch[]>{
    return this.auth.request(
      "post",
      '/users/matches/getMatches'
    );
  }
}
