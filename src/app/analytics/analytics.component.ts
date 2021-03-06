import { Component } from '@angular/core';

import { AnalyticsService } from './analytics.service';
import { ArtistAnalyticsData, MediaAnalyticsData } from './analytics-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  private _subscriptionArtists;
  private _subscriptionMedia;
  artistAnalyticsData: ArtistAnalyticsData[] = [];
  mediaTypeAnalyticsData: MediaAnalyticsData[] = [];
  totalNumberOfClicks: number;
  artistData: ArtistAnalyticsData;
  mediaData: MediaAnalyticsData;

  getAnalyticsData() {

    this.analyticsService.getArtistsAnalyticsData()
    .subscribe(
      (data) => {
        if (data) {
          this.artistAnalyticsData.length = 0;
          this.totalNumberOfClicks = 0;
          for (const key in data) {
            if (data[key]) {
              this.artistAnalyticsData.push(data[key]);
              this.totalNumberOfClicks = data[key].HitCount + this.totalNumberOfClicks;
            }
          }
        }
      }
    );

    this.analyticsService.getMediaAnalyticsData()
    .subscribe(
      (data) => {
        if (data) {
          this.mediaTypeAnalyticsData.length = 0;
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
    this.totalNumberOfClicks = 0;
    this.getAnalyticsData();
  }
}
