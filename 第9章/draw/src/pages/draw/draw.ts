import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../app/services/toast.service';

@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html'
})
export class DrawPage {

  // 标题
  private title: string = '';
  // 数据数组
  private items: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private toast: ToastService,
    private storage: Storage) {
    this.title = this.navParams.get('itemKey');
  }

  /**
   * 每次进入页面
   */
  ionViewDidEnter() {
    this.storage.get(this.title).then((data) => {
      if (data) {
        this.items = data;
      } else {
        this.toast.show('没有数据');
      }
    });
  }

  /**
   * 添加选项
   */
  private addItem(): void {
    let prompt = this.alertCtrl.create({
      title: '请输入添加内容',
      inputs: [
        {
          name: 'title',
          placeholder: '选项'
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
  private savaItem(itemTitle: string): boolean {
    if (itemTitle.length === 0) {
      this.toast.show('内容过短');
      return false;
    } else if (itemTitle.length > 15) {
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
      this.storage.set(this.title, this.items);
      return true;
    }
  }

  /**
   * 删除选项
   */
  private deleteItem(item: string): void {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.storage.set(this.title, this.items);
    this.storage.remove(item);
  }

  /**
   * 抽签
   */
  draw() {
    if (this.items.length === 0) {
      this.toast.show('没有数据');
    } else {
      let randomNumber: number = this.getRandomNumber(0, this.items.length);
      this.toast.show(this.items[randomNumber]);
    }
  }

  /**
   * 获取随机数
   */
  getRandomNumber(begin: number, end: number): number {
    return Math.floor(Math.random() * (end - begin)) + begin;
  }
}
