import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { EducationPage } from '../education/education';
import { HobbyPage } from './../hobby/hobby';
import { ProjectPage } from './../project/project';
import { ExperiencePage } from './../experience/experience';
import { SkillPage } from './../skill/skill';
import { PersonPage } from './../person/person';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SkillPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.pages = [
      { title: '个人信息', component: PersonPage },
      { title: '工作技能', component: SkillPage },
      { title: '工作经验', component: ExperiencePage },
      { title: '作品项目', component: ProjectPage },
      { title: '教育背景', component: EducationPage },
      { title: '兴趣爱好', component: HobbyPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
