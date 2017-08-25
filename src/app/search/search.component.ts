import { Component } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ITunesService } from '../itunes.service';
import { SearchParameters } from './searchParams';
import { SearchResult } from './searchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title = 'app';
  searchParams: SearchParameters;
  searchResults: SearchResult[];
  searchResult: SearchResult;

  constructor(private itunesService: ITunesService) {
    this.searchParams = new SearchParameters();
    this.searchResult = new SearchResult();
    this.searchResults = new Array();
  }

  onSubmit(submittedForm) {
    // Populate search params and pass to the service
    this.searchParams.term = submittedForm.value.artistName;

    console.log(submittedForm.value.artistName);
    console.log(this.searchParams.term);
    this.itunesService.GetSongs(this.searchParams)
      .map((response: Response) => response.json())
      .subscribe(
        (data) => {
          console.log(data.results);
          console.log(data.resultCount);
          for (const res of data.results) {
            this.searchResults.push(res);
          }
        },
        (error) => console.log(error)
      );
  }
}
