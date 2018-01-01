import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html',
})
export class NavPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let username: string = '用户名：' + this.navParams.get('username');
    console.log(username);
  }

  popData() {
    let callback = this.navParams.get('callback');
    let data: Object = {
      info: '返回的消息'
    };
    callback(data);
    this.navCtrl.pop();
  }
}
