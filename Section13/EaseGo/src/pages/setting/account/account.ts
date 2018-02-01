import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerifyService } from '../../../app/services/verify.service';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  // 用户数据
  user: UserInfoState = this.userService.getUserInfo();

  // 昵称
  private nickname: string = '';
  // 手机号
  private mobileNumber: string = '';
  // 电子邮箱
  private myEmail: string = '';
  // 性别
  private gender: string = '';
  // 个人介绍
  private introduction: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private verify: VerifyService,
    private http: HttpService,
    private userService: UserService) {

  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.nickname = this.user.nickName;
    this.mobileNumber = this.user.mobile;
    this.myEmail = this.user.email;
    this.introduction = this.user.introduction;
    this.gender = this.user.gender

  }

  /**
   * 修改用户信息
   */
  changeInfo() {

    if (this.nickname.length === 0) {
      this.toast.show('请输入昵称');
    } else if (!this.verify.isMobilePhoneNumber(this.mobileNumber)) {
      this.toast.show('请输入正确的手机号');
    } else if (!this.verify.isEmail(this.myEmail)) {
      this.toast.show('请输入正确的邮箱');
    } else if (this.gender.length === 0) {
      this.toast.show('请选择性别');
    } else if (this.nickname.length > 16) {
      this.toast.show('用户名过长');
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.append('userId', this.user.userId);
      params.append('userLogonName', this.user.account);
      params.append('userPassword', this.user.password);
      params.append('mobile', this.mobileNumber);
      params.append('email', this.myEmail);
      params.append('gender', this.gender);
      params.append('introduction', this.introduction);
      this.http.post('users/updateAccountSetting', params).subscribe(res => {
        this.user.nickName = this.nickname;
        this.user.mobile = this.mobileNumber;
        this.user.email = this.myEmail;
        this.user.gender = this.gender;
        this.user.introduction = this.introduction;
        this.userService.saveUserInfo(this.user);
        this.toast.show('修改成功');
        this.navCtrl.pop();
      }, error => {
        this.toast.show('修改失败');
      });
    }
  }
}
