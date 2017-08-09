import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalService } from '../../services/global-service';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  myGlobal: GlobalService;
  constructor(public navCtrl: NavController, public navParams: NavParams, global : GlobalService) {
    this.myGlobal = global;
    console.log(global);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
