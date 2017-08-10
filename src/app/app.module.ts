import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GlobalService } from '../services/global-service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { SearchPage } from '../pages/search/search';
import { InputModalPage } from '../pages/input-modal/input-modal';
import { SettingsPopoverPage } from '../pages/settings-popover/settings-popover';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    ReaderPage,
    SearchPage,
    HomePage,
    TabsPage,
    InputModalPage,
    SettingsPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Angular2FontawesomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    ReaderPage,
    SearchPage,
    TabsPage,
    InputModalPage,
    SettingsPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
