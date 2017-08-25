import { Component } from '@angular/core';
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
    this.searchResult = {
      artistId: 1,
      collectionId: 1,
      trackId: 1,
      artistName: 'Rahul'
    };

    this.searchResults.push(this.searchResult);

    // Populate search params and pass to the service
    this.searchParams.term = submittedForm.value.artistName;

    console.log(submittedForm.value.artistName);
    console.log(this.searchParams.term);
    this.itunesService.GetSongs(this.searchParams)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
