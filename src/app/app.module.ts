import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ITunesService } from './itunes.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsService } from './analytics/analytics.service';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '**', redirectTo: '/' }
];

// Replace this with correct firebase config
export const firebaseConfig = {
  apiKey: '*',
  authDomain: '*',
  databaseURL: '*',
  storageBucket: '*',
  messagingSenderId: '*'
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchResultsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [ITunesService, AnalyticsService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
