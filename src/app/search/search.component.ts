import { Component } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
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
    {'type': 'Movie'},
    {'type': 'Podcast'},
    {'type': 'Music'},
    {'type': 'MusicVideo'},
    {'type': 'Audiobook'},
    {'type': 'ShortFilm'},
    {'type': 'TvShow'},
    {'type': 'Software'},
    {'type': 'Ebook'},
    {'type': 'All'}
  ];
  selectedMediaType = this.mediaType[1];

  constructor(private itunesService: ITunesService) {
    this.searchParams = new SearchParameters();
  }

  onSubmit(submittedForm) {
    // Populate search params and pass to the service
    this.searchParams.term = submittedForm.value.artistName;

    console.log(submittedForm.value.artistName);
    console.log(this.searchParams.term);
    this.itunesService.GetSongs(this.searchParams);
  }
}
