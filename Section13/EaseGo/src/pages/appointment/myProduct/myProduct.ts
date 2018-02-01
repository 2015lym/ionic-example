import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';

@Component({
  selector: 'page-myProduct',
  templateUrl: 'myProduct.html'
})
export class MyProductPage {

  // 页面数据
  private listData: Array<Object> = [];
  // 根地址
  private baseUrl: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private user: UserService) {
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.baseUrl = this.http.baseUrl;
    let user: UserInfoState = this.user.getUserInfo();
    let params: URLSearchParams = new URLSearchParams();
    params.append('userId', user.userId);
    params.append('userLogonName', user.account);
    params.append('userPassword', user.password);
    this.http.post('pos/list/', params).subscribe(res => {
      this.listData = res.json();
    }, error => {

    });
  }

  getTotalPrices(item: Object): string {
    let totalPrices: number = item['amount'] * item['price'];
    return totalPrices.toString();
  }

}
