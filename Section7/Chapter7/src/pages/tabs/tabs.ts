import { Component } from '@angular/core';

import { ContentPage } from '../content/content';
import { ScrollPage } from '../scroll/scroll';
import { InfinitePage } from '../infinite/infinite';
import { RefresherPage } from '../refresher/refresher';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContentPage;
  tab2Root = ScrollPage;
  tab3Root = InfinitePage;
  tab4Root = RefresherPage;

  constructor() {

  }
}
