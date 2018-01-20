import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { AppVersion } from '@ionic-native/app-version';
import { Vibration } from '@ionic-native/vibration';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';
import { TouchID } from '@ionic-native/touch-id';

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
    private socialSharing: SocialSharing,
    private netWork: Network,
    private nativeStorage: NativeStorage,
    private keyboard: Keyboard,
    private touchId: TouchID) {

  }

  // 1.显示设备信息
  showDeviceInfo() {
    alert('设备平台 : ' + this.device.platform +
      '\n型号: ' + this.device.model);
  }

  // 2.显示 Toast 提示
  showToast() {
    this.toast.show('这是一个toast提示!', '2000', 'center').subscribe(success => {
      // 成功
    }, error => {
      // 失败
    });
  }

  // 3.显示提示框
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

  // 4.显示应用名称
  showAppVersion() {
    this.appVersion.getAppName().then(appName => {
      alert('应用名称 : ' + appName);
    });
  }

  // 5.震动
  showVibration() {
    this.vibration.vibrate(1000);
  }

  // 6.显示分享
  showSocialSharing() {
    let message: string = '';
    let subject: string = '测试Ionic Native分享功能';
    let link: string = 'http://t.cn/RQafITd';
    this.socialSharing.share(message, subject, link);
  }

  // 7.显示网络状态
  showNetwork() {
    let disconnectSubscription = this.netWork.onDisconnect().subscribe(() => {
      alert('断网');
    });
    let connectSubscription = this.netWork.onConnect().subscribe(() => {
      setTimeout(() => {
        alert('联网' + '\n联网类型' + this.netWork.type);
      }, 3000);
    });
  }

  // 8.储存数据
  showNativeStorage() {
    this.nativeStorage.getItem('data').then((data) => {
      console.log('储存的数据 : ' + JSON.stringify(data));
    }, (err) => {
      console.log('无数据');
    });

    let data: Object = {
      username: '张三',
      password: '123456'
    };
    this.nativeStorage.setItem('data', data).then((data) => {
      console.log('储存成功');
    }, (err) => {
      console.log('储存失败');
    });
  }

  // 9.显示键盘
  showKeyboard() {
    this.keyboard.show();
    this.keyboard.onKeyboardShow().subscribe(() => {
      console.log('键盘已弹出');
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      console.log('键盘已收回');
    });
  }

  // 10.显示 TouchID
  showTouchID() {
    this.touchId.verifyFingerprint('指纹验证').then((res) => {
      console.log('验证通过', res)
    }, (err) => {
      console.error('验证失败', err)
    });
  }
}
