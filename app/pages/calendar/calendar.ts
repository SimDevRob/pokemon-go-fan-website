import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage implements OnInit, OnDestroy {
  constructor(private navCtrl: NavController) {
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    
  }
}
