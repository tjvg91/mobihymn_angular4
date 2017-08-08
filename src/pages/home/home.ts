import { Component, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../services/global-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ GlobalService ]
})
export class HomePage implements OnInit{
  title: string;
  hymnalList: Array<object>;
  zone: NgZone;
  myHttp: Http;
  myGlobal: GlobalService;

  constructor(public homeCtrl: NavController, global : GlobalService, http: Http, ngZone : NgZone) {
    this.zone = ngZone;
    this.title = "MobiHymn";
    this.myGlobal = global;
    this.myHttp = http;
  }
  
  onHttpSuccess(){
    console.log(this);
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