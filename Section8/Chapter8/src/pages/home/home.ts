import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log("加载页面完成");
  }

  ionViewWillEnter () {
    console.log("将要进入页面");
  }

  ionViewDidEnter () {
    console.log("已经进入页面");
  }

  ionViewWillLeave () {
    console.log("将要离开页面");
  }

  ionViewDidLeave () {
    console.log("已经离开页面");
  }

  ionViewWillUnload () {
    console.log("将要销毁页面");
  }

  ionViewCanEnter () {
    console.log("是否可以进入页面");
  }

  ionViewCanLeave () {
    console.log("是否可以离开页面");
  }

}
