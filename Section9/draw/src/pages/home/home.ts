import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../app/services/toast.service';
import { DrawPage } from '../draw/draw';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // 数据数组
  private items: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private toast: ToastService,
    private storage: Storage) {

  }

  /**
   * 每次进入页面
   */
  ionViewDidEnter() {
    this.storage.get('homeList').then((data) => {
      if (data) {
        this.items = data;
      } else {
        this.toast.show('没有数据');
      }
    });
  }

  /**
   * 点击选项
   */
  itemSelected(item: string) {
    let params: Object = {
      itemKey: item
    };
    this.navCtrl.push(DrawPage, params);
  }

  /**
   * 添加选项
   */
  addItem(): void {
    let prompt = this.alertCtrl.create({
      title: '请输入添加内容',
      inputs: [
        {
          name: 'title',
          placeholder: '标题'
        },
      ],
      buttons: [
        {
          text: '关闭',
          handler: data => {
            console.log('点击关闭按钮');
          }
        },
        {
          text: '保存',
          handler: data => {
            return this.savaItem(data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * 保存选项
   */
  savaItem(itemTitle: string): boolean {
    if (itemTitle.length === 0) {
      this.toast.show('内容过短');
      return false;
    } else if (itemTitle.length > 10) {
      this.toast.show('内容过长');
      return false;
    } else {
      for (let key of this.items) {
        if (itemTitle === key) {
          this.toast.show('已存在');
          return false;
        }
      }
      this.items.push(itemTitle);
      this.storage.set('homeList', this.items);
      return true;
    }
  }

  /**
   * 删除选项
   */
  deleteItem(item: string): void {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.storage.set('homeList', this.items);
    this.storage.remove(item);
  }
}
