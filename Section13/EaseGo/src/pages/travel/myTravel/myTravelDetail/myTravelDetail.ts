import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';
import { EditTravelPage } from '../editTravel/editTravel';

declare var AMap;

@Component({
  selector: 'page-myTravelDetail',
  templateUrl: 'myTravelDetail.html'
})
export class MyTravelDetailPage {
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

  /**
   * 上传图片
   */
  fileUpload(event) {
    let self = this;
    function uploadComplete(evt) {
      var data = JSON.parse(evt.target.responseText);
      alert(JSON.stringify(data));
    };
    function uploadFailed(evt) {
      self.toast.show('修改失败');
    };
    var formData = new FormData();
    formData.append("articleId", this.pageData['_id']);
    formData.append("file", event.target.files[0]);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.open("POST", this.http.baseUrl + "api/v1/articles/newPhoto");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(formData);
  }

  /**
   * 编辑游记
   */
  editTravel() {
    let params: Object = {
      data: this.pageData
    };
    this.navCtrl.push(EditTravelPage, params);
  }
}
