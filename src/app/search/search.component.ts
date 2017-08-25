import { Component } from '@angular/core';
import { ITunesService } from '../itunes.service';
import { SearchParameters } from './searchParams';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title = 'app';
  searchParams: SearchParameters;
  searchResults: SearchParameters[];

  constructor(private itunesService: ITunesService) {
    this.searchParams = new SearchParameters();
  }

  onSubmit(submittedForm) {

    this.searchParams = {
      term: 'a',
      // media: MediaEnum.Movie,
      callback: 'b',
      limit: 1,
      explicit: false
    };

    this.searchResults.push(this.searchParams);

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
