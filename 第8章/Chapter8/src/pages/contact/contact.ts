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
    let profileModal = this.modalCtrl.create(ModPage);
    profileModal.present();
  }
}
