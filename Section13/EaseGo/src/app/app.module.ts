import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppointmentPage } from '../pages/appointment/appointment';
import { LoginPage } from '../pages/login/login';
import { MyPlacePage } from '../pages/myPlace/myPlace';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { SightseeingPlacePage } from '../pages/sightseeingPlace/sightseeingPlace';
import { HttpService } from './services/http.service';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AppointmentPage,
    LoginPage,
    MyPlacePage,
    RegisterPage,
    SettingPage,
    SightseeingPlacePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppointmentPage,
    LoginPage,
    MyPlacePage,
    RegisterPage,
    SettingPage,
    SightseeingPlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HttpService,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => {
        return new HttpService(xhrBackend, requestOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule { }
