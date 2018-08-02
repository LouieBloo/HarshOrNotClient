import { Component, OnInit } from '@angular/core';
import { AllSearchService } from '../../../services/user/search/all/all-search.service';
import { SearchQuery } from '../../../models/search';
import { NouisliderModule } from 'ng2-nouislider';
import { Router } from '../../../../../node_modules/@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:SearchQuery;
  searchResults:User[];

  constructor(private searchService:AllSearchService,private router:Router){}

  ngOnInit() {
    this.resetSearchQuery();
    this.submit();
  }

  submit(){
    
    this.searchQuery.bodyType = this.formatBodyType(this.searchQuery.bodyTypeRaw);
    this.searchService.searchAllUsers(this.searchQuery).subscribe(result =>{
      this.searchResults = result;
    })
  }

  //takes in bodyTypeRaw and returns an array of strings representing that object
  formatBodyType(bodyObject):string[]{
    let returnObj:string[] = [];
    if(bodyObject.althletic){
      returnObj.push("Althletic");
    }
    if(bodyObject.thin){
      returnObj.push("Thin");
    }
    if(bodyObject.average){
      returnObj.push("Average");
    }
    if(bodyObject.plus){
      returnObj.push("Plus");
    }
    if(bodyObject.veryPlus){
      returnObj.push("Very Plus");
    }

    return returnObj;
  }


  //create empty searchQuery
  resetSearchQuery(){
    this.searchQuery = {range:35,useRange:false,bodyTypeRaw:{}}
  }
}
