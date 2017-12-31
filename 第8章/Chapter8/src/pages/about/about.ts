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
    console.log('进入下一个页面');
    this.navCtrl.push(NavPage);
  }
}
