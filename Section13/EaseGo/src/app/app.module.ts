import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppointmentPage } from '../pages/appointment/appointment';
import { LoginPage } from '../pages/login/login';
import { MyTravelPage } from '../pages/travel/myTravel/myTravel';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { OtherTravelPage } from '../pages/travel/otherTravel/otherTravel';
import { ProductPage } from '../pages/appointment/product/product';
import { DetailPage } from '../pages/appointment/detail/detail';
import { ReservePage } from '../pages/appointment/reserve/reserve';
import { MyProductPage } from '../pages/appointment/myProduct/myProduct';
import { AccountPage } from '../pages/setting/account/account';
import { ChangePasswordPage } from '../pages/setting/changePassword/changePassword';
import { CreateTravelPlacePage } from '../pages/travel/createTravel/createTravel';
import { PrivacyPage } from '../pages/register/privacy/privacy';
import { EditTravelPage } from '../pages/travel/myTravel/editTravel/editTravel';
import { EditTravelNotePage } from '../pages/travel/myTravel/editTravelNote/editTravelNote';
import { MyTravelDetailPage } from '../pages/travel/myTravel/myTravelDetail/myTravelDetail';
import { OtherTravelDetailPage } from '../pages/travel/otherTravel/otherTravelDetail/otherTravelDetail';

import { HttpService } from './services/http.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { VerifyService } from './services/verify.service';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MyApp,
    AppointmentPage,
    LoginPage,
    MyTravelPage,
    RegisterPage,
    SettingPage,
    OtherTravelPage,
    ProductPage,
    DetailPage,
    ReservePage,
    MyProductPage,
    AccountPage,
    ChangePasswordPage,
    CreateTravelPlacePage,
    PrivacyPage,
    EditTravelPage,
    EditTravelNotePage,
    MyTravelDetailPage,
    OtherTravelDetailPage
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
    MyTravelPage,
    RegisterPage,
    SettingPage,
    OtherTravelPage,
    ProductPage,
    DetailPage,
    ReservePage,
    MyProductPage,
    AccountPage,
    ChangePasswordPage,
    CreateTravelPlacePage,
    PrivacyPage,
    EditTravelPage,
    EditTravelNotePage,
    MyTravelDetailPage,
    OtherTravelDetailPage
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
    UserService
  ]
})
export class AppModule { }
