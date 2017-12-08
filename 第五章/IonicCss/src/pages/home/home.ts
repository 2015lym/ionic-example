import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ButtonPage } from './button/button';
import { ListPage } from './list/list';
import { CardPage } from './card/card';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private buttonPage: any;
  private listPage: any;
  private cardPage: any;

  constructor(public navCtrl: NavController) {
      this.buttonPage = ButtonPage;
      this.listPage = ListPage;
      this.cardPage = CardPage;
  }

}
