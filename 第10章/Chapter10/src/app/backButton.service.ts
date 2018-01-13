import { Injectable } from '@angular/core';
import { Platform, ToastController, App, NavController, Tabs } from 'ionic-angular';

@Injectable()
export class BackButtonService {

  // 控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  constructor(
    public platform: Platform,
    public app: App,
    public toastCtrl: ToastController) { }

  /*
   * 注册返回按钮
   */
  public registerBackButtonAction(tabRef: Tabs): void {

    this.platform.registerBackButtonAction(() => {
      // 获取NavController
      let activeNav: NavController = this.app.getActiveNavs()[0];
      // 如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        // 执行退出
        this.showExit();
      }
    });
  }

  /*
   * 退出应用方法
   */
  private showExit(): void {
    // 如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      // 第一次按，弹出Toast
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      }).present();
      // 标记为true
      this.backButtonPressed = true;
      // 两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}