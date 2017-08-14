import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Searchbar, AlertController, ToastController } from 'ionic-angular';
import { GlobalService } from '../../services/global-service';

import * as _ from 'lodash';

/**
 * Generated class for the InputModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-modal',
  templateUrl: 'input-modal.html'
})

export class InputModalPage{
  inputType : string;
  myGlobal : GlobalService;
  hymnList: Array<object> = new Array<object>();
  activeHymnal: string;
  activeHymn: string;
  navParams: NavParams
  hymnLimit : Number;
  hymnSubscribe: any;
  hymnFilter: string;
  recentList: Array<object>;
  bookmarkList: Array<object>;

  @ViewChild('hymnFilter') hymnFilterSearchbar:Searchbar;
  @ViewChild('bkmkFilter') bkmkFilterSearchbar:Searchbar;

  Math: any;

  origHymnList : Array<object>;

  constructor(public viewCtrl: ViewController, inputParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.inputType = "all_hymns";
    this.hymnLimit = 5;  
    this.navParams = inputParams;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
    this.hymnList = this.navParams.get('allHymns')
    this.activeHymnal = this.navParams.get('activeHymnal');
    this.myGlobal = this.navParams.get('globalService');
    
    this.activeHymn = this.myGlobal.getActiveHymn();
    let activeHymn = this.activeHymn
    this.hymnFilter = _.filter(this.hymnList, item => {
      return item.id == activeHymn;
    })[0].number;

    this.origHymnList = this.hymnList.map(x => Object.assign({}, x));
    this.recentList = this.myGlobal.getRecentList();
    this.bookmarkList = this.myGlobal.getBookmarksList();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.hymnFilterSearchbar.setFocus();
    }, 500);    
  }

  filterHymns(event){
    let st = event.target.value;
    if(st)
      this.hymnList = this.origHymnList.filter((item) => {
        return new RegExp(st).test(item['number']) || new RegExp(st).test(item['firstLine']);
      });
    else
      this.hymnList = this.origHymnList;
  }

  setActiveHymn(hymnId){
    this.myGlobal.setActiveHymn(hymnId);
    this.viewCtrl.dismiss();
  }

  getIndicator() : string{
    let limit = this.hymnLimit;
    let length = this.hymnList.length;
    return 'Displaying ' + Math.min(+limit, length) + ' of ' + this.hymnList.length + ' hymns';
  }

  allHymnSelect(){
    setTimeout(() => {
      this.hymnFilterSearchbar.setFocus();
    }, 200);    
  }

  bkmkSelect(){
    setTimeout(() => {
      this.bkmkFilterSearchbar.setFocus();
    }, 200);    
  }

  presentConfirmUnbookmark(){
    let confirmUnbookmark = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Are you sure you want to remove bookmark?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.myGlobal.removeFromBookmarks(this.activeHymnal, this.activeHymn);
            this.presentUnbookmarkConfirmed();
          }
        }
      ]
    });
    confirmUnbookmark.present();
  }

    presentUnbookmarkConfirmed(){
    let confirmedUnbookmark = this.toastCtrl.create({
      message: 'Bookmark removed',
      duration: 3000
    });
    confirmedUnbookmark.present();
  }
}
