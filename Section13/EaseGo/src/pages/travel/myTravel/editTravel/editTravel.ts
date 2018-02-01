import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';

declare var AMap;
@Component({
  selector: 'page-editTravel',
  templateUrl: 'editTravel.html'
})
export class EditTravelPage {
  @ViewChild('map_container') map_container: ElementRef;

  // 页面数据
  private pageData: object = {};
  // 根地址
  private baseUrl: string = '';
  // 用户信息
  private user: UserInfoState = this.userService.getUserInfo();

  private geolocationSpot: any;
  private travelName: string = '';
  private startDate: string = '';
  private mileage: string = '';
  private state: boolean = false;

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService) {
    this.pageData = this.navParams.get('data');
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.configData();
    this.createMap();
  }

  /**
   * 加载默认数据
   */
  configData() {
    this.travelName = this.pageData['name'];
    this.startDate = this.pageData['startDate'];
    this.mileage = this.pageData['mileage'];
    if (this.pageData['state'] === '已发布') {
      this.state = true;
    } else {
      this.state = false;
    }
  }

  /**
   * 创建地图
   */
  createMap() {
    this.geolocationSpot = [this.pageData['geolocationSpot'][1], this.pageData['geolocationSpot'][0]];

    let self = this;
    var map = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
      zoom: 10,
      center: [this.pageData['geolocationSpot'][1], this.pageData['geolocationSpot'][0]]
    });

    var marker = new AMap.Marker({
      position: [this.pageData['geolocationSpot'][1], this.pageData['geolocationSpot'][0]]
    });
    var clickEventListener;
    clickEventListener = map.on('click', function (e) {
      self.geolocationSpot = [e.lnglat.getLng(), e.lnglat.getLat()];
      if (marker) map.remove(marker);
      marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()]
      });
      marker.setMap(map);
    });
    marker.setMap(map);
  }

  submitInfo() {
    if (this.travelName === '') {
      this.toast.show('请输入游记名称');
    } else if(this.mileage === '') {
      this.toast.show('请输入里程数');
    } else {

    }
    
    let params: URLSearchParams = new URLSearchParams();
    params.append('articleId', this.pageData['_id']);
    params.append('geolocationSpot[]', this.geolocationSpot[1]);
    params.append('geolocationSpot[]', this.geolocationSpot[0]);
    params.append('location', this.pageData['location']);
    params.append('publicity', '公开');
    params.append('startDate', this.startDate);
    params.append('userLogonName', this.user.account);
    params.append('userPassword', this.user.password);
    params.append('mileage', this.mileage);
    params.append('name', this.travelName);
    params.append('state', this.state === true ? '已发布' : '编辑');
    this.http.put('articles/updateArticle', params).subscribe(res => {
      this.toast.show('修改成功');
      this.navCtrl.pop();
    }, error => {
      this.toast.show('修改失败');
    });
  }
}
