import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  // 标题
  private title: string;
  // 页面数据
  private listData: Array<Object> = [];
  // 根地址
  private baseUrl: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService) {
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.baseUrl = this.http.baseUrl;
    this.title = this.navParams.get('title');
    this.http.get('products/list/' + this.navParams.get('category')).subscribe(res => {
      this.listData = res.json();
    }, error => {

    });
  }

  /**
   * 预定
   */
  productDetail(item: Object) {
    let params: Object = { data: item };
    this.navCtrl.push(DetailPage, params);
  }
}
