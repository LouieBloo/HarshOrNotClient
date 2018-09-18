import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../../services/user/matches/matches.service';
import { ProfileMatch } from '../../../models/feedback';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {


  matches:ProfileMatch[];

  constructor(private matchesService:MatchesService) { }

  ngOnInit() {
    this.matchesService.getMatches().subscribe(result=>{
      console.log(result);
      if(result && result.length > 0 && !result[0].error){
        this.matches = result;
      }
    })
  }

  

}
