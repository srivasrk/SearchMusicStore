// enum MediaEnum {
//   Movie, Podcast, Music, MusicVideo, Audiobook, ShortFilm, TvShow, Software, Ebook, All
// }

export class SearchParameters {
  term: string;
  media: string;
  callback: string;
  limit: number;
  explicit: boolean;
}
