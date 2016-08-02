import {Component} from '@angular/core';
import {NavController, Modal, ViewController} from 'ionic-angular';
import { NewsDetail } from '../../components/news-detail/news-detail';
import { NewsData } from '../../providers/news-data/news-data';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  newsLeft: Array<{ title: string, content: string, id: string}>;
  newsRight: Array<{ title: string, content: string, id: string}>;

  constructor(private navCtrl: NavController, private viewController: ViewController) {
    this.newsLeft = [];
    this.newsRight = [];
    for (let i = 0; i < 5; i++ ) {
      this.newsLeft.push({   title: 'News Title: ' + i,
          content: 'This is content for a news article',
          id: i + 'left' 
        }); 
      this.newsRight.push({ 
          title: 'News Title: ' + i,
        content: 'This is content for a news article',
        id: i + 'right'
      });
    }




  };
}
