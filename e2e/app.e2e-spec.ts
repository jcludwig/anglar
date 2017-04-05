import { AnglarPage } from './app.po';

describe('anglar App', () => {
  let page: AnglarPage;

  beforeEach(() => {
    page = new AnglarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
