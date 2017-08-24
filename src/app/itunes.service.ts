import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ITunesService {

  searchURL = 'https://itunes.apple.com/search?';

  constructor(private http: Http) {}

  GetSongs(name: string) {

    if (name !== '') {

      name = name.split(' ').join('+');
      this.searchURL = this.searchURL + 'term=' + name + '&limit=25';
    }

    return this.http.get(this.searchURL);
  }
}
