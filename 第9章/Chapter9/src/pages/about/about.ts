import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '提示框标题',
      subTitle: '提示框二级标题',
      buttons: ['关闭']
    });
    alert.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '提示框标题',
      message: '提示框信息',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('你点击了取消');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('你点击了确定');
          }
        }
      ]
    });
    alert.present();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: '登录',
      inputs: [
        {
          name: 'username',
          placeholder: '用户名'
        },
        {
          name: 'password',
          placeholder: '密码',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '登录',
          handler: data => {
            return this.checkUserIsValid(data.username, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  checkUserIsValid(username: string, password: string): boolean {
    if (username === 'lym' && password === '123456') {
      return true;
    } else {
      return false;
    }
  }
}
