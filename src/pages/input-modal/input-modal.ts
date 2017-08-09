import { Component, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

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
  elementRef: ElementRef

  Math: any;

  origHymnList : Array<object>;

  constructor(public viewCtrl: ViewController, inputParams: NavParams, elementRef : ElementRef) {
    this.inputType = "all_hymns";
    this.hymnLimit = 5;  
    this.navParams = inputParams;
    this.elementRef = elementRef;
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

  filterHymns(event){
    let st = this.hymnFilter;
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

  getIndicator(){
    let limit = this.hymnLimit;
    let length = this.hymnList.length;
    return 'Displaying ' + Math.min(+limit, length) + ' of ' + this.hymnList.length + ' hymns';
  }
}
