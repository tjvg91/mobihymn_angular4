import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../services/global-service';
import * as _ from 'lodash';

import { Tabs } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ GlobalService ]
})
export class HomePage implements OnInit{
  title: string;
  hymnalList: Array<object>;
  myHttp: Http;
  myGlobal: GlobalService;

  tabPage: TabsPage

  constructor(public homeCtrl: NavController, global : GlobalService, http: Http, tabPage: TabsPage) {
    this.title = "MobiHymn";
    this.myGlobal = global;
    this.myHttp = http;
    this.tabPage = tabPage;
  }
  
  setActiveHymnal(hymnalId : string){
    this.myGlobal.activeHymnal = _.filter(this.hymnalList, function(h){
      return h.id == hymnalId;
    })[0];
    this.tabPage.tabRef.select(1);
  }

  ngOnInit(){
    this.myGlobal.getHymnals(this.myHttp).subscribe(res => {
            console.log(res.output);
            this.myGlobal.hymnals = res.output;
            this.hymnalList = this.myGlobal.hymnals;
            /*this.hymnals.forEach(h =>{
                
            })*/
            /*http.get('../assets/hymnals.json').map(res => res.json()).subscribe(res1 => {
                this.hymns = res1.output;
            })*/
        });;
  }
}