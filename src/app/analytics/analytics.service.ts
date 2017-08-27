import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { ArtistAnalyticsData, MediaAnalyticsData } from './analytics-data';
import { SearchResult } from '../search/searchResult';


@Injectable()
export class AnalyticsService {

  analyticsArtistsDataChange: Subject<ArtistAnalyticsData[]> = new Subject<ArtistAnalyticsData[]>();
  mediaTypeAnalyticsDataChange: Subject<MediaAnalyticsData[]> = new Subject<MediaAnalyticsData[]>();
  todos$: FirebaseListObservable<any[]>;

  private baseArtistsPath = '/artist-analytics-data';
  private baseMediaPath = '/media-type-analytics-data';
  artistsAnalyticsItems: FirebaseListObservable<ArtistAnalyticsData[]> = null; //  list of objects
  mediaAnalyticsItems: FirebaseListObservable<MediaAnalyticsData[]> = null; //  list of objects

  constructor(private http: Http, private af: AngularFireDatabase) {}

  updateArtistsAnalyticsData(data) {
    this.artistsAnalyticsItems.update(data.$key, data);
  }

  addArtistsAnalyticsData(searchResult: SearchResult) {
    this.artistsAnalyticsItems.push({ArtistName: searchResult.artistName, HitCount: 1});
  }

  updateMediaAnalyticsData(data) {
    console.log('update: ' + data);
    this.mediaAnalyticsItems.update(data.$key, data);
  }

  addMediaAnalyticsData(searchResult: SearchResult) {
    console.log('add: ' + searchResult);
    this.mediaAnalyticsItems.push({MediaType: searchResult.kind, HitCount: 1});
  }

  getArtistsAnalyticsData(query = {}): FirebaseListObservable<ArtistAnalyticsData[]> {
    this.artistsAnalyticsItems = this.af.list(this.baseArtistsPath, {
      query: query
    });
    return this.artistsAnalyticsItems;
  }

  getMediaAnalyticsData(query = {}): FirebaseListObservable<MediaAnalyticsData[]> {
    this.mediaAnalyticsItems = this.af.list(this.baseMediaPath, {
      query: query
    });
    return this.mediaAnalyticsItems;
  }
}
