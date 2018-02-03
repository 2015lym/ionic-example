import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpService } from '../../../../app/services/http.service';
import { UserService, UserInfoState } from '../../../../app/services/user.service';
import { ToastService } from '../../../../app/services/toast.service';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  @ViewChild(Content) content: Content;

  // 页面数据
  private pageData: object = {};
  // 单篇游记数据
  private sectionData: object = {};
  // 根地址
  private baseUrl: string = '';
  // 用户信息
  private user: UserInfoState = this.userService.getUserInfo();
  // 喜欢的人
  private likeArray: Array<object> = [];
  // 评论的人
  private commentArray: Array<object> = [];

  // 单篇游记ID
  private sectionId: string = '';
  // 评论
  private comment: string = '';
  // 是否已点赞
  private isLike: boolean = false;

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
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.baseUrl = this.http.baseUrl;
    this.pageData = this.navParams.get('data');
    this.sectionData = this.navParams.get('sectionData');
    this.likeArray = this.sectionData['likes'];
    this.commentArray = this.sectionData['comments'];
    this.sectionId = this.navParams.get('sectionId');
    this.checkIsLike();
  }

  /**
   * 检查是否已经点赞过
   */
  checkIsLike() {
    for (let i = 0; i < this.likeArray.length; i++) {
      if (this.likeArray[i]['liker']['_id'] === this.user.userId) {
        this.isLike = true;
      }
    }
  }

  /**
   * 点赞喜欢
   */
  likeArticle() {
    if (this.isLike) {
      this.toast.show('已经点赞了');
      return;
    }

    let params: URLSearchParams = new URLSearchParams();
    params.append('articleId', this.pageData['_id']);
    params.append('likerId', this.user.userId);
    params.append('userLogonName', this.user.account);
    params.append('userPassword', this.user.password);
    params.append('sectionId', this.sectionId);
    this.http.post('articles/addLike', params).subscribe(res => {
      this.isLike = true;
      this.toast.show('已点赞');
    }, error => {
      this.toast.show('点赞失败');
    });
  }

  /**
   * 添加评论
   */
  addComment() {
    if (this.comment.length === 0) {
      this.toast.show('请输入评论');
    } else if (this.comment.length > 30) {
      this.toast.show('评论过长');
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.append('articleId', this.pageData['_id']);
      params.append('commenterId', this.user.userId);
      params.append('userLogonName', this.user.account);
      params.append('userPassword', this.user.password);
      params.append('sectionId', this.sectionId);
      params.append('text', this.comment);
      this.http.post('articles/addComment', params).subscribe(res => {
        let comment: Object = {
          commenter: {
            name: this.user.nickName,
            avatarFileName: this.user.headImage.replace(this.http.baseUrl, '')
          },
          text: this.comment
        };
        this.commentArray.push(comment);
        this.comment = '';
        // 直接滚动不生效，必须设置延时
        setTimeout(() => {
          this.content.scrollToBottom();
        }, 200);
      }, error => {
        this.toast.show('评论失败');
      });
    }
  }
}
