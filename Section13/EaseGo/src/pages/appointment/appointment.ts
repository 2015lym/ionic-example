import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../app/services/http.service';
import { ProductPage } from './product/product';
import { DetailPage } from './detail/detail';

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html'
})
export class AppointmentPage {

  private listData: Array<Object> = [];
  private baseUrl: string = this.http.baseUrl;

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private http: HttpService) {
  }

  /**
   * 每次进入页面
   */
  ionViewWillEnter() {
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
}
