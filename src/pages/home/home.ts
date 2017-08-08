import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../services/global-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ GlobalService ]
})
export class HomePage {
  title: string;
  hymnalList: Array<object>;
  zone: NgZone

  constructor(public homeCtrl: NavController, global : GlobalService, http: Http, ngZone : NgZone) {
    this.zone = ngZone;
    this.title = "MobiHymn";
    global.getHymnals(http, function(data){        
      //ngZone.runOutsideAngular(() =>{
      //});
      setTimeout(function(){
        let hymnalList = data;
        console.log(hymnalList);
        let title = this.title + hymnalList.length;
      },0);        
    });
  }
  
}