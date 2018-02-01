import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';


@Component({
  selector: 'page-otherTravelDetail',
  templateUrl: 'otherTravelDetail.html'
})
export class OtherTravelDetailPage {

  // 列表数据
  private title: string = '';
  private listArray: Array<Object> = [];
  private baseUrl: string = '';
  private user: UserInfoState = this.userService.getUserInfo();

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService) {
  }

  /**
   * 每次进入页面
   */
  ionViewWillEnter() {

    
  }

}
