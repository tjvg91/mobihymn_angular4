import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController } from 'ionic-angular';
import { GlobalService } from '../../services/global-service';
import { InputModalPage } from '../../pages/input-modal/input-modal';
import { SettingsPopoverPage } from '../../pages/settings-popover/settings-popover';
import * as _ from 'lodash';

/**
 * Generated class for the ReaderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})

export class ReaderPage implements OnDestroy{
  hymnList: object;
  myGlobal:GlobalService;
  hymnSubscribe: any;
  currentHymn: object;
  activeHymnal: string;

  constructor(public readerCtrl: NavController, public inputPopCtrl: PopoverController, public inputModalCtrl: ModalController, global: GlobalService) {
    this.myGlobal = global;
    this.hymnSubscribe = global.activeHymnChange.subscribe((value) => {
      let hymnList = this.myGlobal.getHymnList()['hymnal' + this.myGlobal.getActiveHymnal()];
      let activeHymn = this.myGlobal.getActiveHymn();
      this.currentHymn = _.filter(hymnList, function(item){
        return item.id == this.activeHymnal;
      })[0];
    });
  }

  presentPopover(myEvent) {
    let popover = this.inputPopCtrl.create(SettingsPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  presentInputModal() {
    let hymns = this.hymnList;
    let inputModal = this.inputModalCtrl.create(InputModalPage, {
      allHymns : hymns,
      activeHymnal : this.activeHymnal
    });
    inputModal.present();
  }

  ionViewDidLoad() {
    this.activeHymnal = this.myGlobal.getActiveHymnal();
    let hymnList = this.myGlobal.getHymnList()['hymnal' + this.activeHymnal];
    this.hymnList = hymnList;
    let activeHymn = this.myGlobal.getActiveHymn();
    this.currentHymn = _.filter(hymnList, function(item){
      return item.id == activeHymn;
    })[0];
    
  }

  ngOnDestroy(){
    this.hymnSubscribe.unsubscribe();
  }

  goToTab(index){
    this.readerCtrl.parent.select(index);
  }
}
