import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavPage } from '../nav/nav';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  pushToNextPage() {
    let data: Object = {
      username: 'lym',
      callback: data => {
        console.log(data.info);
      }
    };
    this.navCtrl.push(NavPage, data);
  }

}
