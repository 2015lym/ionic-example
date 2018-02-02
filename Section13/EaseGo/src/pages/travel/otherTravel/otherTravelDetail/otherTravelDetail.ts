import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';

declare var AMap;

@Component({
  selector: 'page-otherTravelDetail',
  templateUrl: 'otherTravelDetail.html'
})
export class OtherTravelDetailPage {
  @ViewChild('map_container') map_container: ElementRef;

  // 页面数据
  private pageData: object = {};
  // 根地址
  private baseUrl: string = '';
  // 用户数据
  private user: UserInfoState = this.userService.getUserInfo();

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService) {

  }

  /**
   * 每次进入页面
   */
  ionViewWillEnter() {
    this.baseUrl = this.http.baseUrl;
    let url = 'articles/query/' + this.navParams.get('id');
    this.http.get(url).subscribe(res => {
      this.pageData = res.json()[0];
      this.createMap();
    }, error => {
      this.toast.show('获取数据失败');
    });
  }

  /**
   * 创建地图
   */
  createMap() {
    var map = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
      zoom: 10,
      center: [this.pageData['geolocationSpot'][1], this.pageData['geolocationSpot'][0]]
    });
    var marker = new AMap.Marker({
      position: [this.pageData['geolocationSpot'][1], this.pageData['geolocationSpot'][0]]
    });
  }

}
