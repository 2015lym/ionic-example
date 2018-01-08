import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController) {

  }

  normalLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: '加载中...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
