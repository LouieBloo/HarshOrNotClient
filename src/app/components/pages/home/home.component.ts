import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { AutomatedSearchService } from '../../../services/user/search/automated/automated-search.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private automatedSearch:AutomatedSearchService) { }

  ngOnInit() {
    
  }

  searchButtonClicked(){
    this.automatedSearch.search(0,20).subscribe((result)=>{
      console.log(result);
    })
  }

}
