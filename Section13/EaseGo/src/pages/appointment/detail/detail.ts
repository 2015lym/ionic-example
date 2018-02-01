import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { ReservePage } from '../reserve/reserve';
import { UserService } from '../../../app/services/user.service';
import { LoginPage } from '../../login/login';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  // 标题
  private title: string = '';
  // 页面数据
  private item: Object;
  // 根地址
  private baseUrl: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService,
    private userService: UserService) {
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.baseUrl = this.http.baseUrl;
    this.item = this.navParams.get('data');
    this.title = '旅游产品-' + this.item['name'];
  }

  /**
   * 打电话
   */
  call() {

  }

  /**
   * 预定产品
   */
  reserveProduct() {
    if (this.userService.isLogin()) {
      let params: Object = { data: this.item };
      this.navCtrl.push(ReservePage, params);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
}
