import { WebBackPage } from './../pages/skill/web-back/web-back';
import { BusinessPage } from './../pages/skill/business/business';
import { SkillPage } from './../pages/skill/skill';
import { DesignPage } from './../pages/project/design/design';
import { ProjectPage } from './../pages/project/project';
import { PersonPage } from './../pages/person/person';
import { HobbyPage } from './../pages/hobby/hobby';
import { ExperiencePage } from './../pages/experience/experience';
import { EducationPage } from './../pages/education/education';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DevelopmentPage } from '../pages/project/development/development';
import { InteractionPage } from '../pages/skill/interaction/interaction';
import { MobilePage } from '../pages/skill/mobile/mobile';
import { WebFontPage } from '../pages/skill/web-font/web-font';
import { MenuPage } from '../pages/menu/menu';

@NgModule({
  declarations: [
    MyApp,
    EducationPage,
    ExperiencePage,
    HobbyPage,
    PersonPage,
    ProjectPage,
    DesignPage,
    DevelopmentPage,
    SkillPage,
    BusinessPage,
    InteractionPage,
    MobilePage,
    WebBackPage,
    WebFontPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EducationPage,
    ExperiencePage,
    HobbyPage,
    PersonPage,
    ProjectPage,
    DesignPage,
    DevelopmentPage,
    SkillPage,
    BusinessPage,
    InteractionPage,
    MobilePage,
    WebBackPage,
    WebFontPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
