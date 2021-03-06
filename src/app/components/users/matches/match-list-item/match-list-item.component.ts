import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../../models/match';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.css']
})
export class MatchListItemComponent implements OnInit {

  @Input()match:Match;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.match.target.preference){
      this.match.target.preference = this.match.target.preference.replace("Female","women").replace("Male","men").replace("Both","women and men");
    }
  }

  matchClicked(){
    this.router.navigateByUrl('/profile/' + this.match.target._id);
  }

}
