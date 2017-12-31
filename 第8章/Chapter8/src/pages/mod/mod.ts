import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mod',
  templateUrl: 'mod.html',
})
export class ModPage {

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
