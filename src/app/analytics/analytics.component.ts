import { Component } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { AnalyticsService } from './analytics.service';
import { ArtistAnalyticsData } from './analytics-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  private _subscription;
  artistAnalyticsData: ArtistAnalyticsData[];
  musicTypeAnalyticsData: ArtistAnalyticsData[];

  getAnalyticsData() {
    this.analyticsService.getArtistsAnalyticsData()
    .map((response: Response) => response.json())
    .subscribe(
      (data: ArtistAnalyticsData[]) => {
        this.artistAnalyticsData = data;
        console.log(this.artistAnalyticsData);
        for (const art of this.artistAnalyticsData){
          // do some thing
          // this.artistAnalyticsData.push(art);
          console.log(art.HitCount);
        }
      }
    );
    this.artistAnalyticsData = this.analyticsService.artistAnalyticsData;
  }

  constructor(private analyticsService: AnalyticsService) {

    this._subscription = this.analyticsService.analyticsArtistsDataChange.subscribe((value) => {
      this.artistAnalyticsData = value;
    });

    this.getAnalyticsData();
  }


}
