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
import { ProductPage } from '../pages/appointment/product/product';
import { DetailPage } from '../pages/appointment/detail/detail';
import { ReservePage } from '../pages/appointment/reserve/reserve';

import { HttpService } from './services/http.service';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { VerifyService } from './services/verify.service';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    AppointmentPage,
    LoginPage,
    MyPlacePage,
    RegisterPage,
    SettingPage,
    SightseeingPlacePage,
    ProductPage,
    DetailPage,
    ReservePage
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
    SightseeingPlacePage,
    ProductPage,
    DetailPage,
    ReservePage
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
    },
    VerifyService,
    ToastService,
    NativeStorage,
    UserService
  ]
})
export class AppModule { }
