import { Component, OnInit } from '@angular/core';
import { AllSearchService } from '../../../services/user/search/all/all-search.service';
import { SearchQuery } from '../../../models/search';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:SearchQuery = {range:35,useRange:false};

  constructor(private searchService:AllSearchService){}

  ngOnInit() {
    this.submit();
  }

  submit(){
    this.searchService.searchAllUsers(this.searchQuery).subscribe(result =>{
      console.log(result);
    })
  }

}
