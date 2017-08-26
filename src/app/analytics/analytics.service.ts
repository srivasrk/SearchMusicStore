import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import { ArtistAnalyticsData, MediaAnalyticsData } from './analytics-data';
import { SearchResult } from '../search/searchResult';

@Injectable()
export class AnalyticsService {

  analyticsArtistsDataChange: Subject<ArtistAnalyticsData[]> = new Subject<ArtistAnalyticsData[]>();
  mediaTypeAnalyticsDataChange: Subject<MediaAnalyticsData[]> = new Subject<MediaAnalyticsData[]>();
  artistAnalyticsData: ArtistAnalyticsData;
  mediaAnalyticsData: MediaAnalyticsData;

  constructor(private http: Http) {}

  storeAnalyticsData(searchResult: SearchResult) {

    this.artistAnalyticsData = new ArtistAnalyticsData();
    this.artistAnalyticsData.ArtistName = searchResult.artistName;
    this.artistAnalyticsData.HitCount = 1;

    const body = JSON.stringify(this.artistAnalyticsData);

    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://search-itunes-d32b5.firebaseio.com/artist-analytics-data.json',
                  body,
                  {headers: headers});
  }

  getArtistsAnalyticsData() {
    // Get Artist names,
    return this.http.get('https://search-itunes-d32b5.firebaseio.com/artist-analytics-data.json');
  }

  getMusicTypeAnalyticsData() {
    // Get Media types,
    return this.http.get('https://search-itunes-d32b5.firebaseio.com/media-type-analytics-data.json');
  }

}
