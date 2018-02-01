import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../app/services/user.service';
import { ToastService } from '../../../app/services/toast.service';
import { VerifyService } from '../../../app/services/verify.service';

@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html'
})
export class ReservePage {

  // 标题
  private title: string = '';
  // 页面数据
  private item: Object;
  // 根地址
  private baseUrl: string = '';
  // 用户数据
  private user: UserInfoState;

  // 数量
  private amount: string = '1';
  // 联系邮箱
  private contactEmail: string = '';
  // 联系人
  private contactName: string = '';
  // 联系电话
  private contactPhone: string = '';
  // 产品ID
  private productId: string = '';
  // 使用时间
  private useDate: string = '';

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService,
    private verify: VerifyService) {
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.baseUrl = this.http.baseUrl;
    this.item = this.navParams.get('data');
    this.title = this.item['name'];
    this.productId = this.item['_id'];
    this.user = this.userService.getUserInfo();
  }

  /**
   * 提交
   */
  submit() {
    if (this.checkForm()) {
      let params: URLSearchParams = new URLSearchParams();
      params.append('amount', this.amount);
      params.append('contactEmail', this.contactEmail);
      params.append('contactName', this.contactName);
      params.append('contactPhone', this.contactPhone);
      params.append('productId', this.productId);
      params.append('useDate', this.useDate);
      params.append('userId', this.user.userId);
      params.append('userLogonName', this.user.account);
      params.append('userPassword', this.user.password);
      this.http.post('pos/newPo', params).subscribe(res => {
        this.toast.show('提交成功');
        this.navCtrl.pop();
      }, error => {
        this.toast.show('提交失败');
      });
    }
  }

  /**
   * 检查用户输入
   */
  checkForm(): boolean {
    if (this.amount === '0' ||
      this.amount.length == 0 ||
      !this.verify.isNumber(this.amount)) {
      this.toast.show('请输入正确的数量');
      return false;
    } else if (this.useDate.length === 0) {
      this.toast.show('请选择使用日期');
      return false;
    } else if (this.contactName.length === 0) {
      this.toast.show('请输入用户姓名');
      return false;
    } else if (this.contactName.length > 5) {
      this.toast.show('用户姓名过长');
      return false;
    } else if (!this.verify.isMobilePhoneNumber(this.contactPhone)) {
      this.toast.show('请输入正确的手机号');
      return false;
    } else if (!this.verify.isEmail(this.contactEmail)) {
      this.toast.show('请输入正确的邮箱');
      return false;
    } else {
      return true;
    }
  }
}
