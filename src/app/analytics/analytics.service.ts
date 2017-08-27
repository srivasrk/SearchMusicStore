import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { ArtistAnalyticsData, MediaAnalyticsData } from './analytics-data';
import { SearchResult } from '../search/searchResult';


@Injectable()
export class AnalyticsService {

  private baseArtistsPath = '/artist-analytics-data';
  private baseMediaPath = '/media-type-analytics-data';
  artistsAnalyticsItems: FirebaseListObservable<ArtistAnalyticsData[]> = null; //  list of objects
  mediaAnalyticsItems: FirebaseListObservable<MediaAnalyticsData[]> = null; //  list of objects

  constructor(private af: AngularFireDatabase) {}

  updateArtistsAnalyticsData(data) {
    this.artistsAnalyticsItems.update(data.$key, data);
  }

  addArtistsAnalyticsData(searchResult: SearchResult) {
    this.artistsAnalyticsItems.push({ArtistName: searchResult.artistName, HitCount: 1});
  }

  updateMediaAnalyticsData(data) {
    this.mediaAnalyticsItems.update(data.$key, data);
  }

  addMediaAnalyticsData(searchResult: SearchResult) {
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
