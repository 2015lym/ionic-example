import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { VerifyService } from '../../app/services/verify.service';
import { ToastService } from '../../app/services/toast.service';
import { HttpService } from '../../app/services/http.service';
import { UserService, UserInfoState } from '../../app/services/user.service';
import { PrivacyPage } from './privacy/privacy';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  // 手机号
  private mobileNumber: string = '';
  // 验证码
  private verificationCode: string = '';
  // 登录用户名
  private username: string = '';
  // 密码
  private password: string = '';
  // 昵称
  private nickname: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private verify: VerifyService,
    private toast: ToastService,
    private http: HttpService,
    private events: Events,
    private userService: UserService) {

  }

  /**
   * 获取验证码
   */
  getVerificationCode() {
    let passVerify: boolean = this.verify.isMobilePhoneNumber(this.mobileNumber);
    if (passVerify) {
      let params: URLSearchParams = new URLSearchParams();
      params.append('mobile', this.mobileNumber);
      this.http.post('users/get-verification-code', params).subscribe(res => {
        this.toast.show('获取成功');
        let data: Object = res.json();
        this.verificationCode = data['verificationCode'];
      }, error => {
        this.toast.show('获取验证码失败');
      });
    } else {
      this.toast.show('请输入正确的手机号');
    }
  }

  /**
   * 注册
   */
  register() {
    if (this.checkForm()) {
      let params: URLSearchParams = new URLSearchParams();
      params.append('mobile', this.mobileNumber);
      params.append('verifyCode', this.verificationCode);
      params.append('logonName', this.username);
      params.append('password', this.password);
      params.append('name', this.nickname);
      this.http.post('users/register', params).subscribe(res => {
        let data: Object = res.json();
        let user: UserInfoState = {
          account: this.username,
          password: this.password,
          nickName: this.nickname,
          mobile: this.mobileNumber,
          userId: data['_id'],
          headImage: this.http.baseUrl + data['avatarFileName'],
          email: '',
          introduction: '',
          gender: '3'
        };
        this.userService.saveUserInfo(user);
        localStorage.setItem('isLogin', '1');
        this.events.publish('loginStatus');
        this.toast.show('注册成功');
        this.navCtrl.pop();
      }, error => {
        this.toast.show('注册失败');
      });
    }
  }

  /**
   * 隐私协议
   */
  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  /**
   * 检查用户输入
   */
  checkForm(): boolean {
    if (!this.verify.isMobilePhoneNumber(this.mobileNumber)) {
      this.toast.show('请输入正确的手机号');
      return false;
    } else if (this.verificationCode.length === 0) {
      this.toast.show('请输入短信验证码');
      return false;
    } else if (this.username.length === 0) {
      this.toast.show('请输入用户名');
      return false;
    } else if (this.password.length === 0) {
      this.toast.show('请输入密码');
      return false;
    } else if (this.nickname.length === 0) {
      this.toast.show('请输入昵称');
      return false;
    } else if (this.username.length > 16) {
      this.toast.show('用户名过长');
      return false;
    } else if (this.password.length < 6) {
      this.toast.show('密码过短');
      return false;
    } else if (this.password.length > 16) {
      this.toast.show('密码过长');
      return false;
    } else if (this.nickname.length > 10) {
      this.toast.show('昵称过长');
      return false;
    } else {
      return true;
    }
  }
}
