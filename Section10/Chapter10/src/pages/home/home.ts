import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public platform: Platform) {

  }

  ionViewWillEnter() {
    if (this.platform.is('android')) {
      console.log('我是安卓设备');
    }
    console.log('设备信息：' + this.platform.platforms());
    console.log('版本信息：' + JSON.stringify(this.platform.versions()));
  }
}
