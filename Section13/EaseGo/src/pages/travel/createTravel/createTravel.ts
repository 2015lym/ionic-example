import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var AMap;

@Component({
  selector: 'page-createTravel',
  templateUrl: 'createTravel.html'
})
export class CreateTravelPlacePage {
  @ViewChild('map_container') map_container: ElementRef;


  /**
   * 构造函数
   */
  constructor(public navCtrl: NavController) {
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
    var map = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
      zoom: 10
    });
    var marker = new AMap.Marker({

    });
    var clickEventListener;
    clickEventListener = map.on('click', function (e) {
      //console.log(e.lnglat.getLng(),e.lnglat.getLat());
      if (marker) map.remove(marker);
      marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()]
      });
      marker.setMap(map);
    });
    marker.setMap(map);
  }
}
