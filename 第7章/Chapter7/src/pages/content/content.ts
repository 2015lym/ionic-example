import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {
  }

  // 获取 ion-content 宽度
  getContentWidth() {
    console.log(this.content.contentWidth);
  }

}
