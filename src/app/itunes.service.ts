import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ITunesService {
  constructor(private http: Http) {}

  GetSongs(names: any[]) {
  return this.http.get('https://itunes.apple.com/search?term=jack+johnson&limit=25');
  }
}
