import { Component, OnDestroy } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { AnalyticsService } from './analytics.service';
import { ArtistAnalyticsData, MediaAnalytics } from './analytics-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnDestroy {

  private _subscriptionArtists;
  private _subscriptionMedia;
  artistAnalyticsData: ArtistAnalyticsData[] = [];
  mediaTypeAnalyticsData: MediaAnalytics[] = [];
  totalNumberOfClicks = 0;

  getAnalyticsData() {

    this.analyticsService.getArtistsAnalyticsData()
    .map((response: Response) => response.json())
    .subscribe(
      (data: ArtistAnalyticsData[]) => {

        console.log(data);
        if (data && data.length > 0) {
          this.artistAnalyticsData = data;

          console.log(data);
          for (const res of data) {
            this.totalNumberOfClicks = this.totalNumberOfClicks + res.HitCount;
          }
        }
      }
    );

    this.analyticsService.getMusicTypeAnalyticsData()
    .map((response: Response) => response.json())
    .subscribe(
      (data: MediaAnalytics[]) => {
        if (data && data.length > 0) {
          this.mediaTypeAnalyticsData = data;
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
