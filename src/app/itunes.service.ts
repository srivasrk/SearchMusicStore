import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import { SearchParameters } from './search/searchParams';

import { SearchResult } from './search/searchResult';

@Injectable()
export class ITunesService {

  searchBaseURL = 'https://itunes.apple.com/search?';
  searchURL = '';

  searchResultsChange: Subject<SearchResult[]> = new Subject<SearchResult[]>();
  searchResults: SearchResult[];

  constructor(private http: Http) {
    this.searchResults = new Array();
  }

  GetSongs(searchParams: SearchParameters) {

    if (searchParams) {
      searchParams.term = searchParams.term.split(' ').join('+');
      if (searchParams.term) {
        this.searchURL = this.searchBaseURL + 'term=' + searchParams.term;
      }
      if (searchParams.media) {
        this.searchURL = this.searchBaseURL + '&entity=' + searchParams.term;
      }
      this.searchURL = this.searchURL + '&limit=25';
    }

    this.http.get(this.searchURL)
    .map((response: Response) => response.json())
    .subscribe(
      (data) => {
        console.log(data.results);
        this.searchResults.length = 0;
        for (const res of data.results) {
          this.searchResults.push(res);
        }
      // this.searchResultsChange.next(this.searchResults);
      },
    );
  }
}
