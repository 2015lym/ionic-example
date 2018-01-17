import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { FirstPage } from './../first/first';
import { SecondPage } from '../second/second';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FirstPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.pages = [
      { title: '页面一', component: FirstPage },
      { title: '页面二', component: SecondPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
