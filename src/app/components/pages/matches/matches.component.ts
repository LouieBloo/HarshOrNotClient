import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../../services/user/matches/matches.service';
import { Match, MatchLoad } from '../../../models/match';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {


  matches:MatchLoad = {loaded:false};
  denials:MatchLoad = {loaded:false};
  matchQueue:MatchLoad = {loaded:false};

  constructor(private matchesService:MatchesService) { }

  ngOnInit() {
    //get matches
    this.matchesService.getMatches().subscribe(result=>{
      if(result && result.length > 0 && !result[0].error){
        this.matches.matches = result;
      }
      this.matches.loaded = true;
    })
    //get denials
    this.matchesService.getDenials().subscribe(result=>{
      if(result && result.length > 0 && !result[0].error){
        this.denials.matches = result;
      }
      this.denials.loaded = true;
    })
    //get match queue
    this.matchesService.getMatchQueue().subscribe(result=>{
      if(result && result.length > 0 && !result[0].error){
        this.matchQueue.matches = result;
      }
      this.matchQueue.loaded = true;
    })
  }

  

}
