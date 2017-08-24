import { Component } from '@angular/core';
import { ITunesService } from './itunes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private itunesService: ITunesService) {}

  onSubmit(submittedForm) {
    // console.log(submittedForm);
    this.itunesService.GetSongs([])
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
