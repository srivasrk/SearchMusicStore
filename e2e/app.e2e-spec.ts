import { SearchMusicStorePage } from './app.po';

describe('search-music-store App', () => {
  let page: SearchMusicStorePage;

  beforeEach(() => {
    page = new SearchMusicStorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
