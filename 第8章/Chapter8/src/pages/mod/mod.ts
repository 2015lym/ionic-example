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
    let modelData: string = '用户名' + this.navParams.get('username');
    console.log(modelData);
  }

  dismissModal() {
    let data: Object = { info: '返回的消息' };
    this.viewCtrl.dismiss(data);
  }
}
