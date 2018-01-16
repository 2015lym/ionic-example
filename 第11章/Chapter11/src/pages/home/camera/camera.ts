import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController) {

  }

  takePhoto() {
    (<any>navigator).camera.getPicture(imageData => {
      console.log(imageData);
    }, error => {

    }, new Object);
  }
}
