import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../../services/user/matches/matches.service';
import { Match } from '../../../models/match';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {


  matches:Match[];

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
