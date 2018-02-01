import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AccountPage } from './account/account';
import { ChangePasswordPage } from './changePassword/changePassword';
import { UserService, UserInfoState } from '../../app/services/user.service';
import { ToastService } from '../../app/services/toast.service';
import { HttpService } from '../../app/services/http.service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  // 头像
  imageUrl: string = '';
  user: UserInfoState = this.userService.getUserInfo();

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService,
    private events: Events) {
    this.imageUrl = this.user.headImage;
  }

  accountSetting() {
    this.navCtrl.push(AccountPage);
  }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  fileUpload(event) {
    let self = this;
    function uploadComplete(evt) {
      var user = JSON.parse(evt.target.responseText);
      self.imageUrl = self.http.baseUrl + user.avatarFileName;
      self.user.headImage = self.imageUrl;
      self.userService.saveUserInfo(self.user);
      self.events.publish('loginStatus');
      self.toast.show('修改成功');
    };
    function uploadFailed(evt) {
      self.toast.show('修改失败');
    };
    var formData = new FormData();
    formData.append("userId", this.user.userId);
    formData.append("file", event.target.files[0]);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.open("POST", this.http.baseUrl + "api/v1/users/updateUserImage");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(formData);
  }

}
