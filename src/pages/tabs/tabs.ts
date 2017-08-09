import { Component, ViewChild } from '@angular/core';

import { Tabs } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { ReaderPage } from '../reader/reader';
import { SearchPage } from '../search/search';

import { GlobalService } from '../../services/global-service';


@Component({
  templateUrl: 'tabs.html',
  providers: [ GlobalService ]
})

export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ReaderPage;
  tab3Root = SearchPage;
  tab4Root = AboutPage;
  tab5Root = SettingsPage;

  activeHymnal: string;
  activeHymn: string;

  @ViewChild('#myTabs') tabRef: Tabs;

  constructor(myGlobal : GlobalService) {
    this.activeHymnal = myGlobal.activeHymnal;
  }
}
