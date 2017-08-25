import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SearchParameters } from '../searchParams';

import { SearchResult } from '../searchResult';
import { ITunesService } from '../../itunes.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {


  searchResults: SearchResult[];
  _subscription;

  constructor(private itunesService: ITunesService) {
    this.searchResults = itunesService.searchResults;

    this._subscription = itunesService.searchResultsChange.subscribe((value) => {
      this.searchResults.length = 0;
      this.searchResults = value;
      console.log(value);
    }); }

  ngOnInit() {
  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }

}
