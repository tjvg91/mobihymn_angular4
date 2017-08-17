import { Component, ViewChild} from '@angular/core';

import { Tabs } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { ReaderPage } from '../reader/reader';
import { SearchPage } from '../search/search';

import { GlobalService } from '../../services/global-service';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ReaderPage;
  tab3Root = SearchPage;
  tab4Root = SettingsPage;

  activeHymnal: string;
  activeHymn: string;

  @ViewChild('#myTabs') public tabRef: Tabs;

  constructor(myGlobal : GlobalService) {
    this.activeHymnal = myGlobal.getActiveHymnal();
  }
}
