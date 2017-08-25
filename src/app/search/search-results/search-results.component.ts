import { Component, OnInit, Input } from '@angular/core';

import { SearchParameters } from '../searchParams';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults: SearchParameters[];

  constructor() { }

  ngOnInit() {
  }

}
