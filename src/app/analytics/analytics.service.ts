import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import { ArtistAnalyticsData, MediaAnalytics } from './analytics-data';
import { SearchResult } from '../search/searchResult';

@Injectable()
export class AnalyticsService {

  analyticsArtistsDataChange: Subject<ArtistAnalyticsData[]> = new Subject<ArtistAnalyticsData[]>();
  mediaTypeAnalyticsDataChange: Subject<MediaAnalytics[]> = new Subject<MediaAnalytics[]>();
  artistAnalyticsData: ArtistAnalyticsData;

  constructor(private http: Http) {}

  storeAnalyticsData(searchResult: SearchResult) {
    // 1. Store the artist name
    // 2. Store the type of content
    // 3. Store number of clicks

    this.artistAnalyticsData = new ArtistAnalyticsData();
    this.artistAnalyticsData.ArtistName = searchResult.artistName;
    this.artistAnalyticsData.HitCount = 1;

    const body = JSON.stringify(this.artistAnalyticsData);

    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.http.put('https://easy-tax-a8796.firebaseio.com/articles.json',
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
