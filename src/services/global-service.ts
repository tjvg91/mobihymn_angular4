import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

@Injectable()
export class GlobalService {
    hymnals:Array<object> = new Array<object>();
    hymns:object = {};

    activeHymnal:string = "";
    activeHymn:string = "";
    recentCount:Number = 5;

    bookmarks: Array<object> = new Array<object>();
    history: Array<object> = new Array<object>();
    
    public hymnalChange : Subject<Array<object>> = new Subject<Array<object>>();
    public hymnChange : Subject<object> = new Subject<object>();
    public activeHymnalChange : Subject<string> = new Subject<string>(); 
    public activeHymnChange : Subject<string> = new Subject<string>(); 
    public bookmarksChange : Subject<Array<object>> = new Subject<Array<object>>(); 
    public historyChange : Subject<Array<object>> = new Subject<Array<object>>(); 

    constructor() {
     }

    setHymnals(newValue:Array<object>) {        
        this.hymnals = newValue;        
        this.hymnalChange.next(this.hymnals);
    }

    addToHymns(propName: string, newValue:Array<object>) {        
        this.hymns[propName] = newValue;        
        this.hymnChange.next(this.hymns);
    }

    addToBookmarks(newValue: object){
        this.bookmarks.push(newValue);
        this.bookmarksChange.next(this.bookmarks);
    }

    addToRecent(newValue: object){
        var index = this.history.findIndex(i => i['hymnalId'] == newValue['hymnalId'] &&
                                    i['hymnId'] == newValue['hymnId']);
        if(index >= 0)
            this.history.splice(index);
        
        this.history.splice(0, 0, newValue);
        if(this.history.length > this.recentCount)
            this.history.splice(this.history.length - 1);

        this.historyChange.next(this.history);
    }

    removeFromBookmarks(hymnalId: string, hymnId: string){
        let index = this.bookmarks.findIndex(i => i['hymnId'] == hymnId && i['hymnalId'] == hymnalId);
        this.bookmarks.splice(index);
        this.bookmarksChange.next(this.bookmarks);
    }

    setActiveHymnal(newValue:string){
        this.activeHymnal = newValue
        this.activeHymnalChange.next(this.activeHymnal);
    }

    setActiveHymn(newValue:string){
        this.activeHymn = newValue
        this.activeHymnChange.next(this.activeHymn);

        let activeHymn = this.activeHymn;
        let curHymn = this.hymns['hymnal' + this.activeHymnal].filter(function(item){
            return item['id'] == activeHymn;
        })[0];

        this.addToRecent({
            'hymnalId': this.activeHymnal,
            'hymnId': this.activeHymn,
            'hymnNumber': curHymn['number'],
            'hymnTitle': curHymn['title'],
            'firstLine': curHymn['firstLine']
        });
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

    getRecentCount() : Number{
        return this.recentCount;
    }

    getBookmarksList() : Array<object>{
        return this.bookmarks;
    }

    getRecentList() : Array<object>{
        return this.history;
    }

    getHymnals(http: Http){        
        return http.get('../assets/hymnals.json').map(res => res.json());
    }

    getHymns(http: Http, i: number){
        return http.get('../assets/hymnal ' + i + '.json').map(res => res.json());
    }

    isInBookmark(hymnalId, hymnId){
        return this.bookmarks.findIndex(i => i['hymnalId'] == hymnalId && i['hymnId'] == hymnId) >= 0;
    }
}