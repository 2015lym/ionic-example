import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateTravelPlacePage } from '../createTravel/createTravel';
import { HttpService } from '../../../app/services/http.service';
import { UserService } from '../../../app/services/user.service';
import { ToastService } from '../../../app/services/toast.service';
import { OtherTravelDetailPage } from './otherTravelDetail/otherTravelDetail';

@Component({
  selector: 'page-otherTravel',
  templateUrl: 'otherTravel.html'
})
export class OtherTravelPage {

  // 列表数据
  private listArray: Array<Object> = [];
  // 根地址
  private baseUrl: string = '';

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
    this.baseUrl = this.http.baseUrl;
    this.http.get('articles/list/0').subscribe(res => {
      this.listArray = res.json();
      if (this.listArray.length === 0) {
        this.toast.show('没有数据');
      }
    }, error => {
      this.toast.show('获取数据失败');
    });
  }

  /**
   * 新建游记
   */
  createTravel() {
    this.navCtrl.push(CreateTravelPlacePage);
  }

  /**
   * 游记详情
   */
  travelDetail(item) {
    let params: Object = {
      id: item['_id']
    };
    this.navCtrl.push(OtherTravelDetailPage, params);
  }

  /**
   * 获取赞数
   */
  getLikes(item: Object): string {
    let num: number = 0;
    for (let i = 0; i < item['sections'].length; i++) {
      let likesArray: Array<Object> = item['sections'][i]['likes'];
      num += likesArray.length;
    }
    return num.toString();
  }

  /**
   * 获取评论数
   */
  getComments(item): string {
    let num: number = 0;
    for (let i = 0; i < item['sections'].length; i++) {
      let likesArray: Array<Object> = item['sections'][i]['comments'];
      num += likesArray.length;
    }
    return num.toString();
  }
}
