import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GlobalService } from '../services/global-service';

import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { SearchPage } from '../pages/search/search';
import { InputModalPage } from '../pages/input-modal/input-modal';
import { AuthorModalPage } from '../pages/author-modal/author-modal';
import { RevisionsModalPage } from '../pages/revisions-modal/revisions-modal';
import { SettingsPopoverPage } from '../pages/settings-popover/settings-popover';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ReaderPage,
    SearchPage,
    HomePage,
    TabsPage,
    InputModalPage,
    SettingsPopoverPage,
    AuthorModalPage,
    RevisionsModalPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    ReaderPage,
    SearchPage,
    TabsPage,
    InputModalPage,
    SettingsPopoverPage,
    AuthorModalPage,
    RevisionsModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalService
  ]
})
export class AppModule {}
