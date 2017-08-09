import { Component } from '@angular/core';
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
  navParams: NavParams
  hymnLimit : Number;
  hymnSubscribe: any;

  origHymnList : Array<object>;

  constructor(public viewCtrl: ViewController, global : GlobalService, inputParams: NavParams) {
    this.inputType = "all_hymns";
    this.myGlobal = global;
    this.hymnLimit = 5;  
    this.navParams = inputParams;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
    this.hymnList = this.navParams.get('allHymns')
    this.activeHymnal = this.navParams.get('activeHymnal');

    this.origHymnList = this.hymnList.map(x => Object.assign({}, x));
  }

  hymnsInfinite(scrollEv: any){
    this.hymnLimit = this.hymnList.length;
    console.log(scrollEv);
  }

  filterHymns(event){
    let st = event.target.value;
    if(st)
      this.hymnList = this.origHymnList.filter((item) => {
        return new RegExp(st).test(item['number']) || new RegExp(st).test(item['firstLine']);
      })
    else
      this.hymnList = this.origHymnList;
    console.log(event);
  }

  setActiveHymn(hymn){
    this.myGlobal.setActiveHymn(hymn['id']);
    console.log(this.myGlobal);
    this.viewCtrl.dismiss();
  }
}
