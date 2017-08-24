import { Component } from '@angular/core';
import { ITunesService } from './itunes.service';
import { SearchParameters } from './searchParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchParams: SearchParameters;

  constructor(private itunesService: ITunesService) {
    this.searchParams = new SearchParameters();
  }

  onSubmit(submittedForm) {

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
