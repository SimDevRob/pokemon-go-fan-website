import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController, NavController} from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data/calendar-data';
import { Day } from '../../providers/calendar-data/day';
//import { NewsData } from '../../providers/news-data/news-data';

/**
 * Calendar Component
 * Renders and populates a calendar using Google Calendar API
 * @author rob(hackd.design)
 * 
 *  
*/
@Component({
  selector: 'calendar-component',
  template : ` 
  <ion-card>
  <ion-card-header>
    <ion-row>
      <ion-col offset-10 width-10>
        <button button>Last Month</button>
      </ion-col>
      <ion-col text-center offset-10 width-30>
        <h1>August 2012</h1>
        </ion-col>
      <ion-col offset-20>
        <button button>Next Month</button>
      </ion-col>
    </ion-row> <!-- End Header Row -->
    <ion-row>
      <ion-col *ngFor="let dayName of dayNames" width-15>
        {{dayName}}
      </ion-col>
    </ion-row>
  </ion-card-header>
  <hr>
  <ion-row *ngFor="let row of rows">
    <ion-col class="calendar-tile" *ngFor="let col of row">
          {{col.dayNumber}}
    </ion-col>
  </ion-row>
</ion-card>
`  
})
/**
 * Main public calendar component class will render and populate calendar stuff.
 */
export class CalendarComponent implements OnInit, OnDestroy {

  text: string;
  days: Day[];
  dayNames: string[];
  tiles: Array<{ id: number, row: number, col: number, data: Day}>;
  // Declare Constants
  MAX_TILE_HEIGHT = 6;
  MAX_TILE_WIDTH = 7;
  gridX = [];
  gridY = [];
  rows = [];
  offset = 20;
  counter = 0;
  daysInMonth = {};
  todaysDate = '';
  todaysYear = '';
  todaysMonth = '';

  constructor(private navController: NavController, private viewController: ViewController) {
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat' ];
    this.daysInMonth = {
     January: 31,
     February: 28,
     March: 31,
     April: 30,
     May: 31,
     June: 30,
     July: 31,
     August: 31,
     November: 30,
     December: 31
    };
  }
   /////////////////
  /// LifeCycle ///
 /////////////////


  /**
   * Initialize the calendar tiles and subscribe to data streams
   */
  ngOnInit() {
    // initialize data
    this.days = [];
    this.tiles = [];

// Set Header Names 
    for ( let i = 0, m = 365; i < m; i++ ) {
      this.days.push({ dayName: this.dayNames[ i % 7],
        monthNumber: i % 12,
        dayNumber: i,
        message: 'I am day' + i});
    }  
    
    // Separate each row into arrays
    let tempRowArray = [];
    let tempColArray = [];

    // assign vales into the row
    
    // For each row ..
    this.counter = 0;
    for ( let rowI = 0; rowI < this.MAX_TILE_HEIGHT; rowI++) {
    debugger;    
      // In each row ..
      for (let colI = 0; colI < this.MAX_TILE_WIDTH; colI++) {
        tempColArray.push(this.days[this.counter + this.offset]);
        //console.log(this.days[this.counter + this.offset]);
        this.counter++;
      }
      this.rows.push(tempColArray);
      tempColArray = [];
    }
  } // End For
  /**
   * Unsubscribe to data streams to avoid memory leaks
   */
  ngOnDestroy() {
    this.counter = 0;
  };

     ////////////
    // EVENTS //
   ////////////

  showDetails(tile_id: number) {

  }
}
