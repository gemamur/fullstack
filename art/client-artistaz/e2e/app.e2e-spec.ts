import { ClientArtistazPage } from './app.po';

describe('client-artistaz App', () => {
  let page: ClientArtistazPage;

  beforeEach(() => {
    page = new ClientArtistazPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
