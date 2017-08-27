import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchParameters } from '../searchParams';
import { SearchResult } from '../searchResult';
import { ITunesService } from '../../itunes.service';
import { AnalyticsService } from '../../analytics/analytics.service';
import { ArtistAnalyticsData, MediaAnalyticsData } from '../../analytics/analytics-data';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  artistAnalyticsData: ArtistAnalyticsData[] = [];
  mediaAnalyticsData: MediaAnalyticsData[] = [];
  searchResults: SearchResult[];
  _subscription;
  found = false;

  constructor(private itunesService: ITunesService,
    private analyticsService: AnalyticsService, @Inject(DOCUMENT) private document: Document) {

    this.searchResults = itunesService.searchResults;

    this._subscription = itunesService.searchResultsChange.subscribe((value) => {
      this.searchResults.length = 0;
      this.searchResults = value;
      console.log(value);
    });
  }

  ngOnInit() {
  }

  scrollToTop() {
    console.log('clicked');
    this.document.body.scrollTop = 0;
  }

  private updateArtistsAnalyticsData(searchResult: SearchResult) {

    this.analyticsService.getArtistsAnalyticsData()
    .subscribe(
      (data) => {
        if (data) {
          this.artistAnalyticsData.length = 0;
          for (const key in data) {
            if (data[key]) {
              this.artistAnalyticsData.push(data[key]);
            }
          }
        }
      }
    );

    this.found = false;
    for (const key in this.artistAnalyticsData) {
      if (this.artistAnalyticsData[key].ArtistName === searchResult.artistName) {
        this.artistAnalyticsData[key].HitCount = this.artistAnalyticsData[key].HitCount + 1;
        this.analyticsService.updateArtistsAnalyticsData(this.artistAnalyticsData[key]);
        this.found = true;
      }
    }

    if (!this.found) {
      this.analyticsService.addArtistsAnalyticsData(searchResult);
    }
  }

  private updateMediaAnalyticsData(searchResult: SearchResult) {

    this.analyticsService.getMediaAnalyticsData()
    .subscribe(
      (data) => {
        if (data) {
          this.mediaAnalyticsData.length = 0;
          for (const key in data) {
            if (data[key]) {
              this.mediaAnalyticsData.push(data[key]);
            }
          }
        }
      }
    );

    this.found = false;
    for (const key in this.mediaAnalyticsData) {
      if (this.mediaAnalyticsData[key].MediaType === searchResult.kind) {
        this.mediaAnalyticsData[key].HitCount = this.mediaAnalyticsData[key].HitCount + 1;
        this.analyticsService.updateMediaAnalyticsData(this.mediaAnalyticsData[key]);
        this.found = true;
        // break;
      }
    }

    if (!this.found) {
      this.analyticsService.addMediaAnalyticsData(searchResult);
    }

  }

  UpdateAnalyticsData(searchResult: SearchResult) {
    this.updateArtistsAnalyticsData(searchResult);
    this.updateMediaAnalyticsData(searchResult);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }

}
