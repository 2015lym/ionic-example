import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModPage } from '../mod/mod';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public modalCtrl: ModalController) {

  }

  presentToNextPage() {
    let data: Object = {
      username: 'lym'
    };
    let profileModal = this.modalCtrl.create(ModPage, data);
    profileModal.onDidDismiss(data => {
      console.log(data.info);
    });
    profileModal.present();
  }
}
