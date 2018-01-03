import { Component } from '@angular/core';
import { MobilePage } from './mobile/mobile';
import { WebFontPage } from './web-font/web-font';
import { WebBackPage } from './web-back/web-back';
import { InteractionPage } from './interaction/interaction';
import { BusinessPage } from './business/business';

@Component({
  templateUrl: 'skill.html'
})
export class SkillPage {

  tab1Root = MobilePage;
  tab2Root = WebFontPage;
  tab3Root = WebBackPage;
  tab4Root = InteractionPage;
  tab5Root = BusinessPage;

  constructor() {

  }
}
