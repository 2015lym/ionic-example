import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private ngZone: NgZone) { }

  showBattery() {
    this.platform.ready().then(() => {
      (<any>window).addEventListener('batterystatus', (status) => {
        this.ngZone.run(() => {
          alert("电量级别: " + status.level +
            "，充电状态: " + (status.isPlugged ? '是' : '否'));
        });
      }, false);
    });
  }

  showAlbum() {
    this.platform.ready().then(() => {
      (<any>window).imagePicker.getPictures(photo => {
        console.log(photo[0]);
      });
    });
  }
}
