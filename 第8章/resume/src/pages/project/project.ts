import { DesignPage } from './design/design';
import { DevelopmentPage } from './development/development';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'project.html'
})
export class ProjectPage {

  tab1Root = DevelopmentPage;
  tab2Root = DesignPage;

  constructor() {

  }
}
