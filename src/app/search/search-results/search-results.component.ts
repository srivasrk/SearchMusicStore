import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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

  constructor(private itunesService: ITunesService, @Inject(DOCUMENT) private document: Document) {
    this.searchResults = itunesService.searchResults;

    this._subscription = itunesService.searchResultsChange.subscribe((value) => {
      this.searchResults.length = 0;
      this.searchResults = value;
      console.log(value);
    }); }

  ngOnInit() {
  }

  scrollToTop() {
    console.log('clicked');
    this.document.body.scrollTop = 0;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }

}
