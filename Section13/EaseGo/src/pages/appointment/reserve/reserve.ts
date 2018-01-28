import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html'
})
export class ReservePage {

  private title: string = '';
  private item: Object;
  private baseUrl: string = this.http.baseUrl;
  private user: UserInfoState;

  private useDate: string;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('data');
    this.title = this.item['name'];
    this.userService.getUserInfo().then(data => {

    }).catch(err => {
      this.toast.show('个人信息获取失败');
    });
  }

}
