import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

export interface UserInfoState {
  account: string;
  password: string;
  nickName: string;
  mobile: string;
  userId: string;
  headImage: string;
  email: string;
  introduction: string;
  gender: string;
}

/**
 * 用户信息服务
 */
@Injectable()
export class UserService {

  /**
   * 构造函数
   */
  constructor(private http: HttpService) { }

  /**
   * 是否登录
   */
  isLogin(): boolean {
    return localStorage.getItem('isLogin') === '1';
  }

  /**
   * 保存用户信息
   */
  saveUserInfo(userInfo: UserInfoState): void {
    localStorage.setItem('account', userInfo.account);
    localStorage.setItem('password', userInfo.password);
    localStorage.setItem('nickName', userInfo.nickName);
    localStorage.setItem('mobile', userInfo.mobile);
    localStorage.setItem('userId', userInfo.userId);
    localStorage.setItem('headImage', userInfo.headImage);
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('introduction', userInfo.introduction);
    localStorage.setItem('gender', userInfo.gender);
  }

  /**
   * 取得用户信息
   */
  getUserInfo(): UserInfoState {
    let userInfo: UserInfoState = {
      account: localStorage.getItem('account'),
      password: localStorage.getItem('password'),
      nickName: localStorage.getItem('nickName'),
      mobile: localStorage.getItem('mobile'),
      userId: localStorage.getItem('userId'),
      headImage: this.http.baseUrl + localStorage.getItem('headImage'),
      email: localStorage.getItem('email'),
      introduction: localStorage.getItem('introduction'),
      gender: localStorage.getItem('gender')
    }
    return userInfo;
  }
}
