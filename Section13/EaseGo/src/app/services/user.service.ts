import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

export interface UserInfoState {
  account: string;
  password: string;
  nickName: string;
  mobile: string;
  userId: string;
  headImage: string;
}

/**
 * 用户信息服务
 */
@Injectable()
export class UserService {

  /**
   * 构造函数
   */
  constructor(private nativeStorage: NativeStorage) { }

  /**
   * 保存用户信息
   */
  saveUserInfo(userInfo: UserInfoState): void {
    this.nativeStorage.setItem('userInfo', userInfo);
  }

  /**
   * 取得用户信息
   */
  getUserInfo(): Promise<UserInfoState> {
    return this.nativeStorage.getItem('userInfo');
  }
}
