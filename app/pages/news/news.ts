import {Component} from '@angular/core';
import {NavController, Modal, ViewController} from 'ionic-angular';
import { NewsDetail } from '../../components/news-detail/news-detail';
import { NewsData } from '../../providers/news-data/news-data';
@Component({
  templateUrl: 'build/pages/news/news.html'
})
/***                                                         *** 
 * ********** POKEMON GO TIGARD FAN CLUB SITE **************** *
 * **********   Main Landing Page Component   **************** *
 * *                                                        * */
/**
 * This Component initializes the NewsPage
 */
export class NewsPage {
  newsLeft: Array<{ title: string, content: string, id: string}>;
  newsRight: Array<{ title: string, content: string, id: string}>;
  middleContent: Array<{title: string, content: string, id: string}>;
  constructor(private navCtrl: NavController, private viewController: ViewController ) {
    this.newsLeft = [];
    this.newsRight = [];
   this.middleContent = [];
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
      this.middleContent.push({
        title: 'This Could Be Your Ad!',
        content: 'contact us at pokemongotigardbizpromo@tigard.com',
        id: i + '-mid'
      });
    }
  };

  /**
   * Tap handler that displays a detail-modal for News Articles.
   * @param (string) a_id
   */
  showArticle(id: number) {

  }
}
