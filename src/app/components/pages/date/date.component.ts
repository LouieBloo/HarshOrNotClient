import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { AutomatedSearchService } from 'src/app/services/user/search/automated/automated-search.service';
import { SearchResult } from 'src/app/models/search';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {


  //current selected user. We use an array so angular creates a new object everytime the current person changes.
  //This makes it easier to reset the view-single-profile componenet
  currentPerson: SearchResult[];
  //Users array
  private searchResults: SearchResult[];

  status: any;

  constructor(private automatedSearch: AutomatedSearchService) { }

  ngOnInit() {
    this.getPeopleList();
  }

  getPeopleList() {
    this.automatedSearch.search().subscribe(result => {
      this.status = {
        noResults: false,
        notDiscoverable: false
      }
      if (result && !result.error && result.users && result.users.length > 0) {
        this.searchResults = result.users;
        this.getNextPerson();
      } else if (result.error) {
        //this.error = result.error;
        this.status.notDiscoverable = true;
      } else if (result.users) {
        this.status.noResults = true;
      }
    })
  }

  //If there is anyone left in our searchResults array, set the current person to the person in front.
  //The person chosen is then removed from the searchResults array.
  getNextPerson() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.currentPerson = [];
      this.currentPerson[0] = this.searchResults.shift();
    } else {
      this.currentPerson = [];
      this.getPeopleList();
    }
  }


  //When the child components feedback is submitted, this is fired with the userid that was submitted
  childComponentFeedbackSubmittedEvent(userID) {
    this.getNextPerson();
  }


}
