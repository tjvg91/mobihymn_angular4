import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

@Injectable()
export class GlobalService {
    hymnals:Array<object> = new Array<object>();
    hymns:object = {};

    activeHymnal:string = "";
    activeHymn:string = "";
    
    public hymnalChange : Subject<Array<object>> = new Subject<Array<object>>();
    public hymnChange : Subject<object> = new Subject<object>();
    public activeHymnalChange : Subject<string> = new Subject<string>(); 
    public activeHymnChange : Subject<string> = new Subject<string>(); 

    constructor(http: Http) {
        let hymnalsRequest = http.get('../assets/hymnals.json');
     }

    setHymnals(newValue:Array<object>) {        
        this.hymnals = newValue;        
        this.hymnalChange.next(this.hymnals);
    }

    addToHymns(propName: string, newValue:Array<object>) {        
        this.hymns[propName] = newValue;        
        this.hymnChange.next(this.hymns);
    }

    setActiveHymnal(newValue:string){
        this.activeHymnal = newValue
        this.activeHymnalChange.next(this.activeHymnal);
    }

    setActiveHymn(newValue:string){
        this.activeHymn = newValue
        this.activeHymnChange.next(this.activeHymn);
    }

    getHymnalList() : Array<object>{
        return this.hymnals;
    }

    getHymnList() : object{
        return this.hymns;
    }

    getActiveHymnal() : string{
        return this.activeHymnal;
    }

    getActiveHymn() : string{
        return this.activeHymn;
    }

    getHymnals(http: Http){        
        return http.get('../assets/hymnals.json').map(res => res.json());
    }

    getHymns(http: Http, i: number){
        return http.get('../assets/hymnal ' + i + '.json').map(res => res.json());
    }
}