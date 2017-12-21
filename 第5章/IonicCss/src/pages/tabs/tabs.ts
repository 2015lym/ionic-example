import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // Tab的所有页面
  tabRoots: Object[];

  constructor() {
    this.tabRoots = this.getTabInfo();
  }

  /**
   * 取得Tab配置信息
   */
  getTabInfo(): Object[] {
    return [
      {
        root: HomePage,
        tabTitle: '首页',
        tabIcon: 'home'
      },
      {
        root: AboutPage,
        tabTitle: '关于',
        tabIcon: 'information-circle',
        tabBadge: '2'
      },
      {
        root: ContactPage,
        tabTitle: '设置',
        tabIcon: 'person'
      }
    ];
  }
}
