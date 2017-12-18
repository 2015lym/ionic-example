import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ButtonPage } from './button/button';
import { ListPage } from './list/list';
import { CardPage } from './card/card';
import { InputPage } from './input/input';
import { TogglePage } from './toggle/toggle';
import { RangePage } from './range/range';
import { SelectPage } from './select/select';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private buttonPage: any;
  private listPage: any;
  private cardPage: any;

  private inputPage: any;
  private togglePage: any;
  private rangePage: any;
  private selectPage: any;
  

  constructor(public navCtrl: NavController) {
    this.buttonPage = ButtonPage;
    this.listPage = ListPage;
    this.cardPage = CardPage;
    this.inputPage = InputPage;
    this.togglePage = TogglePage;
    this.rangePage = RangePage;
    this.selectPage = SelectPage;
  }

}
