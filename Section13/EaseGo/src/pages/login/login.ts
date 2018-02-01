import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { HttpService } from '../../app/services/http.service';
import { ToastService } from '../../app/services/toast.service';
import { UserService, UserInfoState } from '../../app/services/user.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private http: HttpService,
    private events: Events,
    private userService: UserService) {

  }

  /**
   * 登录
   */
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toast.show("请输入账号");
    } else if (password.value.length == 0) {
      this.toast.show("请输入密码");
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.append('userLogonName', username.value);
      params.append('userPassword', password.value);
      this.http.post('users/logon', params).subscribe(res => {
        let data: Object = res.json();
        let user: UserInfoState = {
          account: username.value,
          password: password.value,
          nickName: data['name'],
          mobile: data['mobile'],
          userId: data['_id'],
          headImage: this.http.baseUrl + data['avatarFileName'],
          email: data['email'],
          introduction: data['introduction'],
          gender: data['gender']
        };
        this.userService.saveUserInfo(user);
        localStorage.setItem('isLogin', '1');
        this.events.publish('loginStatus');
        this.toast.show('登录成功');
        this.navCtrl.pop();
      }, error => {
        this.toast.show('登录失败');
      });
    }
  }
}
