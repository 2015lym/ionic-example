import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  private title: string;
  private listData: Array<Object> = [];
  private baseUrl: string = this.http.baseUrl;

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService) {
  }

  /**
   * 进入页面
   */
  ionViewDidLoad() {
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
