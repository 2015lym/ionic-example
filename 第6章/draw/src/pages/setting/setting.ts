import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastService } from '../../app/services/toast.service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private toast: ToastService) {

  }

  getRandomNumber() {
    let prompt = this.alertCtrl.create({
      title: '随机数测试',
      inputs: [
        {
          name: 'start',
          placeholder: '起始'
        },
        {
          name: 'end',
          placeholder: '终止'
        }
      ],
      buttons: [
        {
          text: '关闭',
          handler: data => {
            console.log('点击关闭按钮');
          }
        },
        {
          text: '测试',
          handler: data => {
            this.checkRandomNumber(data.start, data.end);
            return false;
          }
        }
      ]
    });
    prompt.present();
  }

  checkRandomNumber(start: string, end: string): boolean {
    if (start.length === 0) {
      this.toast.show('请输入起始值');
      return false;
    } else if (end.length === 0) {
      this.toast.show('请输入起始值');
      return false;
    } else if (!this.checkStringIsNumber(start) || !this.checkStringIsNumber(start)) {
      this.toast.show('请输入纯数字');
      return false;
    } else if (start.length > 15 || end.length > 15) {
      this.toast.show('数字超出范围');
      return false;
    } else if (Number(start) > Number(end)) {
      this.toast.show('起始值不能大于结束值');
      return false;
    } else {
      this.toast.show(this.showRandomNumber(Number(start), Number(end)).toString());
      return true;
    }
  }

  /**
   * 判断是否是纯数字
   */
  checkStringIsNumber(checkString: string): boolean {
    var reg = /^[1-9]\d*$|^0$/;
    if (reg.test(checkString) == true) {
      return true;
    } else {
      return false;
    }
  }

  showRandomNumber(begin: number, end: number): number {
    return Math.floor(Math.random() * (end - begin)) + begin;
  }
}
