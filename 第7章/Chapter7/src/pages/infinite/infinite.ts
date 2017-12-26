import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-infinite',
  templateUrl: 'infinite.html'
})
export class InfinitePage {

  // 列表数组
  private items: string[] = [];
  // 数据
  private tagNumber: number = 1;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    for (let i = 1; i < 11; i++) {
      this.items.push('第' + this.tagNumber + '组  第' + i + '条');
    }
  }

  doInfinite(infiniteScroll) {
    console.log('开始滚动');

    setTimeout(() => {
      this.tagNumber++;
      for (let i = 1; i < 11; i++) {
        this.items.push('第' + this.tagNumber + '组  第' + i + '条');
      }

      console.log('滚动结束');
      infiniteScroll.complete();
    }, 500);
  }
}
