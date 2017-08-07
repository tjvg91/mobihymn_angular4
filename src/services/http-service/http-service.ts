import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HTTPService{
    constructor (private http: Http) {}

    getHymnals(){
        return this.http.get('assets/hymnals.json').map(res => res.json());
    }
}