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
  denials:Match[];
  matchQueue:Match[];

  constructor(private matchesService:MatchesService) { }

  ngOnInit() {
    //get matches
    this.matchesService.getMatches().subscribe(result=>{
      if(result && result.length > 0 && !result[0].error){
        this.matches = result;
      }
    })
    //get denials
    this.matchesService.getDenials().subscribe(result=>{
      if(result && result.length > 0 && !result[0].error){
        this.denials = result;
      }
    })
    //get match queue
    this.matchesService.getMatchQueue().subscribe(result=>{
      console.log(result);
      if(result && result.length > 0 && !result[0].error){
        this.matchQueue = result;
      }
    })
  }

  

}
