import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Page1Page } from "../page1/page1";
import { Page2Page } from "../page2/page2";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1Page;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.pages = [
      { title: '页面一', component: Page1Page },
      { title: '页面二', component: Page2Page }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
