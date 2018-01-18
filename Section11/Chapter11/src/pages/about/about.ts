import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { AppVersion } from '@ionic-native/app-version';
import { Vibration } from '@ionic-native/vibration';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private device: Device,
    private toast: Toast,
    private actionSheet: ActionSheet,
    private appVersion: AppVersion,
    private vibration: Vibration,
    private socialSharing: SocialSharing) {

  }

  showDeviceInfo() {
    alert('设备平台 : ' + this.device.platform +
      '\n型号: ' + this.device.model);
  }

  showToast() {
    this.toast.show('这是一个toast提示!', '2000', 'center').subscribe(success => {
      // 成功
    }, error => {
      // 失败
    });
  }

  showActionSheet() {

    let buttonLabels = ['你好', '确定'];

    const options: ActionSheetOptions = {
      title: '你好Ionic',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: '取消',
      androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_LIGHT,
      destructiveButtonLast: true
    };

    this.actionSheet.show(options);
  }

  showAppVersion() {
    this.appVersion.getAppName().then(appName => {
      alert('应用名称 : ' + appName);
    });
  }

  showVibration() {
    this.vibration.vibrate(1000);
  }

  showSocialSharing() {
    let message: string = '';
    let subject: string = '测试ngCordova分享功能';
    let link: string = 'http://t.cn/RQafITd';
    this.socialSharing.share(message, subject, link);
  }

  showNetwork() {

  }

  showNativeStorage() {

  }

  showSQLite() {

  }
}
