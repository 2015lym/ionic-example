import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {

  }

  normalAlert() {
    let alert = this.alertCtrl.create({
      title: '提示框标题',
      subTitle: '提示框二级标题',
      message: '提示框信息',
      buttons: [{ text: '确定' }]
    });
    alert.present();
  }

  inputAlert() {
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
      console.log('登录成功');
      return true;
    } else {
      console.log('账号或密码错误');
      return false;
    }
  }

  normalActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '标题',
      subTitle: '二级标题',
      buttons: [
        {
          text: '分享',
          handler: () => {
            console.log('点击了分享');
          }
        },
        {
          text: '举报',
          handler: () => {
            console.log('点击了举报');
          }
        },
        {
          text: '取消关注',
          role: 'destructive',
          handler: () => {
            console.log('点击了取消关注');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('点击了取消');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
