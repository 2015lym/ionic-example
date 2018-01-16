import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BatteryPage } from './battery/battery';
import { CameraPage } from './camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  batteryPage = BatteryPage;
  cameraPage = CameraPage;

  constructor(public navCtrl: NavController) {

  }

}
