import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';


@Component({
  selector: 'page-editTravelNote',
  templateUrl: 'editTravelNote.html'
})
export class EditTravelNotePage {

  // 页面数据
  private pageData: object = {};
  // 单篇游记数据
  private sectionData: object = {};
  // 根地址
  private baseUrl: string = '';
  // 用户信息
  private user: UserInfoState = this.userService.getUserInfo();

  private text: string = '';
  private sectionId: string = '';
  private articleDate: string = '';
  private isArticleCoverImage: boolean = false;
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
    this.pageData = this.navParams.get('data');
    this.sectionData = this.navParams.get('sectionData');
    this.sectionId = this.navParams.get('sectionId');
    this.text = this.sectionData['text'];
    this.articleDate = this.sectionData['date'];
    this.isArticleCoverImage = this.sectionData['imageFileName'] === this.pageData['coverImageFileName'];
  }

  /**
   * 提交信息
   */
  submitInfo() {
    if (this.text === '') {
      this.toast.show('请输入内容');
    }

    let params: URLSearchParams = new URLSearchParams();
    params.append('articleId', this.pageData['_id']);
    params.append('userLogonName', this.user.account);
    params.append('userPassword', this.user.password);

    params.append('location', this.pageData['location']);
    params.append('imageFileName', this.sectionData['imageFileName']);
    params.append('date', this.articleDate);
    params.append('sectionId', this.sectionId);
    params.append('text', this.text);
    params.append('isArticleCoverImage', this.isArticleCoverImage === true ? '1' : '0');

    this.http.post('articles/updateSection', params).subscribe(res => {
      this.toast.show('修改成功');
      this.navCtrl.pop();
    }, error => {
      this.toast.show('修改失败');
    });
  }

}
