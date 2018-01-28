import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { ReservePage } from '../reserve/reserve';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private title: string = '';
  private item: Object;
  private baseUrl: string = this.http.baseUrl;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('data');
    this.title = '旅游产品-' + this.item['name'];
  }

  call() {

  }

  reserveProduct() {
    let params: Object = { data: this.item };
    this.navCtrl.push(ReservePage, params);
  }
}
