import { Component, OnInit } from '@angular/core';
import { AllSearchService } from '../../../services/user/search/all/all-search.service';
import { SearchQuery } from '../../../models/search';
import { NouisliderModule } from 'ng2-nouislider';
import { Router } from '../../../../../node_modules/@angular/router';
import { User } from '../../../models/user';
import { AgeRangeService } from '../../../services/sanitation/user/ageRange/age-range.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:SearchQuery;
  searchResults:User[];

  minAge = 18;
  maxAge = 100;
  ageRange = [this.minAge,this.maxAge];//we have to duplicate this so our noui component works with a double slider :(


  constructor(private searchService:AllSearchService,private router:Router,private ageRangeConverter:AgeRangeService){}

  ngOnInit() {
    this.resetSearchQuery();
  }

  submit(){
    
    this.searchQuery.bodyType = this.formatBodyType(this.searchQuery.bodyTypeRaw);//filter the bodyType to what the api is expecting
    this.searchQuery.ageRange = this.ageRangeConverter.mapAgeRangeToAPI(this.ageRange);//filter the ageRange to what the api is expecting
    //console.log(this.searchQuery);
    this.searchService.searchAllUsers(this.searchQuery).subscribe(result =>{
      this.searchResults = result;
      console.log(result);
    })
  }

  //takes in bodyTypeRaw and returns an array of strings representing that object
  //todo, makes this better
  formatBodyType(bodyObject):string[]{
    let returnObj:string[] = [];
    if(bodyObject.athletic){
      returnObj.push("Athletic");
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
    this.searchQuery = {range:35,useRange:false,bodyTypeRaw:{}};
    this.ageRange = [this.minAge,this.maxAge];
    this.submit();
  }


 
}
