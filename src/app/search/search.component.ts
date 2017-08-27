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
  mediaType = [
    {'type': 'movie'},
    {'type': 'podcast'},
    {'type': 'music'},
    {'type': 'musicVideo'},
    {'type': 'audiobook'},
    {'type': 'shortFilm'},
    {'type': 'tvShow'},
    {'type': 'software'},
    {'type': 'ebook'},
    {'type': 'all'}
  ];

  constructor(private itunesService: ITunesService) {
    this.searchParams = new SearchParameters();
  }

  onSubmit(submittedForm) {
    // Populate search params and pass to the service
    this.searchParams.term = submittedForm.value.artistName;
    this.searchParams.media = submittedForm.value.mediaType;
    this.itunesService.GetSongs(this.searchParams);
  }
}
