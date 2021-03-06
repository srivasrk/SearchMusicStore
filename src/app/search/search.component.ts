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
    {display: 'Select type', value: ''},
    {display: 'Movie', value: 'movie'},
    {display: 'Podcast', value: 'podcast'},
    {display: 'Music', value: 'music'},
    {display: 'Music Video', value: 'musicVideo'},
    {display: 'Audiobook', value: 'audiobook'},
    {display: 'Short Film', value: 'shortFilm'},
    {display: 'TV Show', value: 'tvShow'},
    {display: 'Software', value: 'software'},
    {display: 'EBook', value: 'ebook'},
    {display: 'All', value: 'all'}
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
