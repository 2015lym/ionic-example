import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ButtonPage } from './button/button';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private buttonPage: any;

  constructor(public navCtrl: NavController) {
      this.buttonPage = ButtonPage;
  }

}
