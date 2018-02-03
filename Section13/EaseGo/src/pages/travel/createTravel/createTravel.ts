import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';
import { ToastService } from '../../../app/services/toast.service';
import { MyTravelDetailPage } from '../myTravel/myTravelDetail/myTravelDetail';

declare var AMap;

@Component({
  selector: 'page-createTravel',
  templateUrl: 'createTravel.html'
})
export class CreateTravelPlacePage {
  @ViewChild('map_container') map_container: ElementRef;

  // 用户信息
  private user: UserInfoState = this.userService.getUserInfo();
  private travelName: string = '';
  private geolocationSpot: Array<string> = [];
  private location: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService,
    private viewCtrl: ViewController) {
  }


  /**
   * 每次进入页面
   */
  ionViewDidEnter() {
    this.createMap();
  }

  /**
   * 创建地图
   */
  createMap() {
    let self = this;
    var map = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
      zoom: 10
    });
    var marker = new AMap.Marker({

    });
    var clickEventListener;
    clickEventListener = map.on('click', function (e) {
      if (marker) map.remove(marker);
      marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()]
      });
      marker.setMap(map);
      self.geolocationSpot = [e.lnglat.getLng(), e.lnglat.getLat()];
      setLocation(map);
    });

    // 获取所在地
    var setLocation = function (mapObj) {
      mapObj.getCity(function (data) {
        self.location = "中国," + data.province + "," + data.city;
      });
    };
  }

  /**
   * 创建游记
   */
  createTravel() {
    if (this.travelName.length === 0) {
      this.toast.show('请输入游记名称');
      return;
    } else if (this.location.length === 0) {
      this.toast.show('请选择游记地点');
      return;
    }

    let params: URLSearchParams = new URLSearchParams();
    params.append('authorId', this.user.userId);
    params.append('geolocationSpot[]', this.geolocationSpot[0]);
    params.append('geolocationSpot[]', this.geolocationSpot[1]);
    params.append('location', this.location);
    params.append('name', this.travelName);
    params.append('userLogonName', this.user.account);
    params.append('userPassword', this.user.password);
    this.http.post('articles/newArticle', params).subscribe(res => {
      this.toast.show('新建成功');
      let params: Object = {
        id: res.json()['_id'],
        isCreate: true
      };

      this.navCtrl.push(MyTravelDetailPage, params).then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
        this.navCtrl.remove(startIndex, 1);
      });
    }, error => {
      this.toast.show('新建失败');
    });
  }
}
