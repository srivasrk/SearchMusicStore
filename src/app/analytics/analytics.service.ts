import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { ArtistAnalyticsData } from './analytics-data';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AnalyticsService {

  artistAnalyticsData: ArtistAnalyticsData[] = [];
  analyticsArtistsDataChange: Subject<ArtistAnalyticsData[]> = new Subject<ArtistAnalyticsData[]>();

  constructor(private http: Http) {

  }

  storeAnalyticsData() {
    // 1. Store the artist name
    // 2. Store the type of content
    // 3. Store number of clicks
  }

  getArtistsAnalyticsData() {
    // Get Artist names,
    return this.http.get('https://search-itunes-d32b5.firebaseio.com/artist-analytics-data.json');
  }

}
