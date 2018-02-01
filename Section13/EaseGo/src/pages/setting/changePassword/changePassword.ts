import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../../app/services/toast.service';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';

@Component({
  selector: 'page-changePassword',
  templateUrl: 'changePassword.html'
})
export class ChangePasswordPage {

  // 旧密码
  oldPassword: string = '';
  // 新密码
  newPassword: string = '';
  // 再次输入密码
  checkPassword: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private http: HttpService,
    private user: UserService) {

  }

  /**
   * 修改密码
   */
  changePassword() {
    let user: UserInfoState = this.user.getUserInfo();

    if (this.oldPassword.length === 0) {
      this.toast.show('请填写旧密码');
    } else if (this.newPassword.length === 0) {
      this.toast.show('请填写新密码');
    } else if (this.checkPassword.length === 0) {
      this.toast.show('请再次填写新密码');
    } else if (this.oldPassword !== user.password) {
      this.toast.show('旧密码错误');
    } else if (this.newPassword.length < 6) {
      this.toast.show('新密码过短');
    } else if (this.newPassword.length > 16) {
      this.toast.show('新密码过长');
    } else if (this.newPassword !== this.checkPassword) {
      this.toast.show('两次输出密码不一致');
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.append('userId', user.userId);
      params.append('userLogonName', user.account);
      params.append('userPassword', user.password);
      params.append('password', this.newPassword);
      this.http.put('users/changePassword', params).subscribe(res => {
        user.password = this.newPassword;
        this.user.saveUserInfo(user);
        this.toast.show('修改成功');
        this.navCtrl.pop();
      }, error => {
        this.toast.show('修改失败');
      });
    }
  }
}
