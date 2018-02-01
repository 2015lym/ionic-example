import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../app/services/http.service';
import { ProductPage } from './product/product';
import { DetailPage } from './detail/detail';
import { MyProductPage } from './myProduct/myProduct';
import { UserService } from '../../app/services/user.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html'
})
export class AppointmentPage {

  // 页面数据
  private listData: Array<Object> = [];
  // 根地址
  private baseUrl: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private http: HttpService) {
      
  }

  /**
   * 每次进入页面
   */
  ionViewWillEnter() {
    this.baseUrl =  this.http.baseUrl;
    this.http.get('products/list/').subscribe(res => {
      this.listData = res.json();
    }, error => {

    });
  }

  /**
   * 经典
   */
  classic() {
    let params = { title: '经典旅游产品', category: 'classic' };
    this.navCtrl.push(ProductPage, params);
  }

  /**
   * 蜜月
   */
  honeymoon() {
    let params = { title: '蜜月旅游产品', category: 'honeymoon' };
    this.navCtrl.push(ProductPage, params);
  }

  /**
   * 亲子
   */
  kid() {
    let params = { title: '亲子旅游产品', category: 'kid' };
    this.navCtrl.push(ProductPage, params);
  }

  /**
   * 家庭
   */
  family() {
    let params = { title: '家庭旅游产品', category: 'family' };
    this.navCtrl.push(ProductPage, params);
  }

  /**
   * 预定
   */
  productDetail(item: Object) {
    let params: Object = { data: item };
    this.navCtrl.push(DetailPage, params);
  }

  /**
   * 我的订单
   */
  myProduct() {
    if (this.userService.isLogin()) {
      this.navCtrl.push(MyProductPage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
}
