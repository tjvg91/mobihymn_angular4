import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { ReaderPage } from '../reader/reader';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReaderPage;
  tab3Root = SearchPage;
  tab4Root = AboutPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
