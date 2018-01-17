import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-battery',
  templateUrl: 'battery.html'
})
export class BatteryPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    (<any>window).addEventListener('batterystatus', (status) => {
      alert("电量级别: " + status.level + 
            "，充电状态: " + (status.isPlugged ? '是' : '否'));
    }, false);
  }
}
