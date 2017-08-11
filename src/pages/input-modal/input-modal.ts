import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Searchbar } from 'ionic-angular';
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
  @ViewChild('hymnFilter') hymnFilterSearchbar:Searchbar;
  @ViewChild('bkmkFilter') bkmkFilterSearchbar:Searchbar;

  Math: any;

  origHymnList : Array<object>;

  constructor(public viewCtrl: ViewController, inputParams: NavParams) {
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

  setActiveHymn(hymn){
    this.myGlobal.setActiveHymn(hymn['id']);
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
}
