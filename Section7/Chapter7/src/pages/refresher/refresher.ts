import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-refresher',
  templateUrl: 'refresher.html'
})
export class RefresherPage {

  // 列表数组
  private items: string[] = [];

  constructor(public navCtrl: NavController) { }

  doRefresh(refresher) {
    console.log('开始刷新', refresher);

    setTimeout(() => {
      for (let i = 1; i < 11; i++) {
        this.items.push('第' + i + '条数据');
      }
      console.log('刷新结束');
      refresher.complete();
    }, 2000);
  }
}
