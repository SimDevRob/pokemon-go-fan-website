import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController, NavController} from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data/calendar-data';
import { Day } from '../../providers/calendar-data/day';
//import { NewsData } from '../../providers/news-data/news-data';

/*
  Generated class for the NewsDetail component.
  by Rob(Hackd.design)

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'calendar-component',
  template: `
    <ion-row>
      <ion-col>
        <ion-card> 
          <ion-card-header>
            I am the calender component!!
          </ion-card-header>
          <ion-card-content>
            I am the Calendar Content ! ! 
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  `
})
/**
 * Calendar component for displaying calendar data inside the calendar view.
 * @dep calendar{data-component}
 * 
 */ 

export class CalendarComponent implements OnInit, OnDestroy {

  text: string;
  day: Day[];
  dayNames: string[];


  constructor(private navController: NavController, private viewController: ViewController) {
    this.dayNames = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun' ];
  }
  ngOnInit() {
    this.day = [];
    for ( let i = 0, m = 31; i < m; i++ ) {
      this.day.push({ dayName: this.dayNames[ i % 7],
        monthNumber: 8,
        dayNumber: i,
        message: 'I am day' + i});
    }
  };
  ngOnDestroy() {

  };
}
