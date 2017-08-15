import { Component, OnDestroy, ViewChild, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, AlertController, ToastController, Gesture } from 'ionic-angular';
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
  templateUrl: 'reader.html',
  animations: [
    trigger('scale', [
      state('hidden', style({
        transform: 'scale(0)'
      })),
      state('shown', style({
        transform: 'scale(1)'
      })),
      transition('hidden => shown', animate('500ms ease')),
      transition('shown => hidden', animate('500ms ease'))
    ]),
    trigger('slideUp', [
      state('up', style({
        transform: 'translate(0px, -44px)'
      })),
      state('down', style({
        transform: 'translate(0px, 0px)'
      })),
      transition('up => down', animate('500ms ease')),
      transition('down => up', animate('500ms ease'))
    ]),
    trigger('slideDown', [
      state('down', style({
        transform: 'translate(0px, 49px)'
      })),
      state('up', style({
        transform: 'translate(0px, 0px)'
      })),
      transition('up => down', animate('500ms ease')),
      transition('down => up', animate('500ms ease'))
    ]),
    trigger('margDown', [
      state('down', style({
        marginBottom: '0'
      })),
      state('up', style({
        marginBottom: '49px'
      })),
      transition('up => down', animate('500ms ease')),
      transition('down => up', animate('500ms ease'))
    ]),
    trigger('margUp', [
      state('up', style({
        marginTop: '0px'
      })),
      state('dpwn', style({
        marginTop: '44px'
      })),
      transition('up => down', animate('500ms ease')),
      transition('down => up', animate('500ms ease'))
    ])
  ]
})

export class ReaderPage implements OnDestroy{
  hymnList: object;
  myGlobal:GlobalService;
  hymnSubscribe: any;
  bookmarksSubscribe: any;
  currentHymn: object;
  activeHymnal: string;
  isBookmarked: boolean;
  gesture: Gesture;

  scaleState: string = 'shown';
  slideUpState: string = 'down';
  slideDownState: string = 'up';
  margUpState: string = 'down';
  margDownState: string = 'up';

  private lyricsContainer: HTMLElement;
  @ViewChild('lyricsContainer') lyricsContainerRef: ElementRef;

  constructor(public readerCtrl: NavController, public inputPopCtrl: PopoverController, public inputModalCtrl: ModalController, global: GlobalService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.myGlobal = global;
    this.hymnSubscribe = global.activeHymnChange.subscribe((value) => {
      let hymnList = this.myGlobal.getHymnList()['hymnal' + this.myGlobal.getActiveHymnal()];
      let activeHymn = this.myGlobal.getActiveHymn();
      this.currentHymn = _.filter(hymnList, function(item){
        return item.id == activeHymn;
      })[0];
      this.isBookmarked = global.isInBookmark(this.activeHymnal, this.currentHymn['id']);
    });

    this.bookmarksSubscribe = global.bookmarksChange.subscribe((value) => {
      this.isBookmarked = global.isInBookmark(this.activeHymnal, this.currentHymn['id']);
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
      activeHymnal : this.activeHymnal,
      globalService: this.myGlobal
    });
    inputModal.present();
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
            this.myGlobal.removeFromBookmarks(this.activeHymnal, this.currentHymn['id']);
            this.presentUnbookmarkConfirmed();
          }
        }
      ]
    });
    confirmUnbookmark.present();
  }

  presentBookmarkConfirmed(){
    let confirmedBookmark = this.toastCtrl.create({
      message: 'Bookmark added',
      duration: 3000
    });
    confirmedBookmark.present();
  }

  presentUnbookmarkConfirmed(){
    let confirmedUnbookmark = this.toastCtrl.create({
      message: 'Bookmark removed',
      duration: 3000
    });
    confirmedUnbookmark.present();
  }

  ionViewDidLoad() {
    this.activeHymnal = this.myGlobal.getActiveHymnal();
    let hymnList = this.myGlobal.getHymnList()['hymnal' + this.activeHymnal];
    this.hymnList = hymnList;
    let activeHymn = this.myGlobal.getActiveHymn();
    this.currentHymn = _.filter(hymnList, function(item){
      return item.id == activeHymn;
    })[0];
    this.isBookmarked = this.myGlobal.isInBookmark(this.activeHymnal, this.currentHymn);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.lyricsContainer = this.lyricsContainerRef.nativeElement;
      this.gesture = new Gesture(this.lyricsContainer);
      this.gesture.listen();
      this.gesture.on('pinch', e => this.pinchZoom(e));      
    }, 500);
  }

  ngOnDestroy(){
    this.hymnSubscribe.unsubscribe();
  }

  goToTab(index){
    this.readerCtrl.parent.select(index);
  }

  toggleBookmark(){
    if(this.isBookmarked){
      this.presentConfirmUnbookmark();
    }
    else{
      this.myGlobal.addToBookmarks({
        'hymnalId': this.activeHymnal,
        'hymnId': this.currentHymn['id'],
        'firstLine': this.currentHymn['firstLine'],
        'number': this.currentHymn['number'],
        'title': this.currentHymn['title']
      });
      this.presentBookmarkConfirmed();
    }
  }

  pinchZoom(event){
    console.log(event);
  }

  toggleFullLyrics(){

  }
}
