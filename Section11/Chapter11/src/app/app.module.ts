import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';
import { ActionSheet } from '@ionic-native/action-sheet';
import { AppVersion } from '@ionic-native/app-version';
import { Vibration } from '@ionic-native/vibration';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';
import { TouchID } from '@ionic-native/touch-id';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    Toast,
    ActionSheet,
    AppVersion,
    Vibration,
    SocialSharing,
    Network,
    NativeStorage,
    Keyboard,
    TouchID
  ]
})
export class AppModule {}
