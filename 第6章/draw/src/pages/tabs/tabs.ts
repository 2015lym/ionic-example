import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingPage;

  constructor() {

  }
}
