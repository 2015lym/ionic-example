import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, Slides } from 'ionic-angular';
import { PopoverPage } from './../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mySlides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController) {

  }

  ionViewWillEnter() {
    this.slides.startAutoplay();
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
