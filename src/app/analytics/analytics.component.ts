import { Component, OnDestroy } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { AnalyticsService } from './analytics.service';
import { ArtistAnalyticsData, MediaAnalyticsData } from './analytics-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnDestroy {

  private _subscriptionArtists;
  private _subscriptionMedia;
  artistAnalyticsData: ArtistAnalyticsData[] = [];
  mediaTypeAnalyticsData: MediaAnalyticsData[] = [];
  totalNumberOfClicks = 0;

  getAnalyticsData() {

    this.analyticsService.getArtistsAnalyticsData()
    .map((response: Response) => response.json())
    .subscribe(
      (data) => {
        if (data) {
          for (const key in data) {
            if (data[key]) {
              this.artistAnalyticsData.push(data[key]);
              this.totalNumberOfClicks = this.totalNumberOfClicks + data[key].HitCount;
            }
          }
        }
      }
    );

    this.analyticsService.getMusicTypeAnalyticsData()
    .map((response: Response) => response.json())
    .subscribe(
      (data) => {
        if (data) {
          for (const key in data) {
            if (data[key]) {
              this.mediaTypeAnalyticsData.push(data[key]);
            }
          }
        }
      }
    );
  }

  constructor(private analyticsService: AnalyticsService) {

    // this.artistAnalyticsData = new Array();
    // this.mediaTypeAnalyticsData = new Array();

    this._subscriptionArtists = this.analyticsService.analyticsArtistsDataChange.subscribe((value) => {
      this.artistAnalyticsData = value;
    });

    this._subscriptionMedia = this.analyticsService.mediaTypeAnalyticsDataChange.subscribe((value) => {
      this.mediaTypeAnalyticsData = value;
    });

    this.getAnalyticsData();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
      this._subscriptionArtists.unsubscribe();
      this._subscriptionMedia.unsubscribe();

  }
}
