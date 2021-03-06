import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * CalendarData
 */
@Injectable()
export class CalendarData {
  data: any;
  articles: Array<{ title: string, content: string, id: number, info: Array<{ data: any }> }>;
  constructor(private http: Http) {
    this.data = null;
  }

  getDays() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('//localhost:1729/pok-tig-cal')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

