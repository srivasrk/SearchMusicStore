import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

import { SearchParameters } from './search/searchParams';

@Injectable()
export class ITunesService {

  searchURL = 'https://itunes.apple.com/search?';

  constructor(private http: Http) {}

  GetSongs(searchParams: SearchParameters) {

    if (searchParams) {
      searchParams.term = searchParams.term.split(' ').join('+');
      this.searchURL = this.searchURL + 'term=' + searchParams.term + '&limit=100';
    }

    return this.http.get(this.searchURL);
  }
}
