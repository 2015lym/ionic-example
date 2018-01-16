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
      alert("剩余电量: " + status.level + 
            " 是否正在充电: " + (status.isPlugged ? '是' : '否'));
    }, false);
  }
}
