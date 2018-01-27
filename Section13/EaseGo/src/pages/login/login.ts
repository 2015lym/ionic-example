import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../app/services/http.service';
import { ToastService } from '../../app/services/toast.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private http: HttpService) {

  }


  /**
   * 登录
   */
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      alert("请输入账号");
    } else if (password.value.length == 0) {
      alert("请输入密码");
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.append('userLogonName', username.value);
      params.append('userPassword', password.value);
      this.http.post('users/logon', params).subscribe(res => {
        this.toast.show('登录成功');
      }, error => {
        this.toast.show('登录失败');
      });
    }
  }
}
