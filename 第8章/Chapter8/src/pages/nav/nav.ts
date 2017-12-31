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
    console.log('ionViewDidLoad NavPage');
    let username: string = this.navParams.get('username');
    let password: string = this.navParams.get('password');
    console.log('用户名：' + username);
    console.log('密码：' + password);
  }

}
