import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

@Injectable()
export class GlobalService {
    hymnals:Array<object>;
    hymns:Array<object>;

    activeHymnal:string;
    activeHymn:string;

    hymnalsRequest: Observable<Response>;
    hymnsRequest: Observable<Response>;
    
    public configObservable = new Subject<number>();
    

    constructor(http: Http) {
        let hymnsRequest = http.get('../assets/hymnals.json');
        let hymnalsRequest = http.get('../assets/hymnals.json');
     }

    updateGlobalVar(newValue:Array<object>) {
        this.hymnals = newValue;        
    }

    getHymnals(http: Http, success: Function){        
        http.get('../assets/hymnals.json').map(res => res.json()).subscribe(res => {
            this.hymnals = res.output;
            
            /*this.hymnals.forEach(h =>{
                
            })*/
            /*http.get('../assets/hymnals.json').map(res => res.json()).subscribe(res1 => {
                this.hymns = res1.output;
            })*/

            success(this.hymnals);
        });
    }
}