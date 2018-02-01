import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AppointmentPage } from '../pages/appointment/appointment';
import { MyTravelPage } from '../pages/travel/myTravel/myTravel';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { OtherTravelPage } from '../pages/travel/otherTravel/otherTravel';
import { UserService, UserInfoState } from './services/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // 根页面
  rootPage: any = OtherTravelPage;
  // 页面数组
  pages: Array<{ title: string, type: string, icon: string, component: any }>;
  // 头像
  imageUrl: string = '';
  // 用户数据
  user: UserInfoState = this.userService.getUserInfo();

  /**
   * 构造函数
   */
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userService: UserService,
    public events: Events) {
    this.initializeApp();
    this.configData();
    events.subscribe('loginStatus', () => {
      this.configData();
    });
    events.subscribe('changeHeadImage',()=>{
      this.imageUrl = this.user.headImage;
    });
  }

  /**
   * 加载 App
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * 初始化页面数据
   */
  configData() {
    if (this.userService.isLogin()) {
      this.pages = [
        {
          title: '退出',
          type: 'push',
          icon: 'ionitron',
          component: LoginPage
        },
        {
          title: '旅友行踪',
          type: 'menu',
          icon: 'bicycle',
          component: OtherTravelPage
        },
        {
          title: '我的足迹',
          type: 'menu',
          icon: 'paw',
          component: MyTravelPage
        },
        {
          title: '预约旅行产品',
          type: 'menu',
          icon: 'briefcase',
          component: AppointmentPage
        },
        {
          title: '设置',
          type: 'menu',
          icon: 'settings',
          component: SettingPage
        }
      ];
      this.imageUrl = this.user.headImage;
    } else {
      this.pages = [
        {
          title: '登录',
          type: 'push',
          icon: 'contact',
          component: LoginPage
        },
        {
          title: '注册',
          type: 'push',
          icon: 'document',
          component: RegisterPage
        },
        {
          title: '旅友行踪',
          type: 'menu',
          icon: 'bicycle',
          component: OtherTravelPage
        },
        {
          title: '预约旅行产品',
          type: 'menu',
          icon: 'briefcase',
          component: AppointmentPage
        }
      ];
      this.imageUrl = './assets/imgs/headImage.png';
    }
  }

  /**
   * 打开页面
   */
  openPage(page) {
    if (page.type === 'push') {
      if (page.title === '退出') {
        localStorage.setItem('isLogin', '0');
        this.events.publish('loginStatus');
        this.nav.setRoot(OtherTravelPage);
      }
      this.nav.push(page.component);
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
