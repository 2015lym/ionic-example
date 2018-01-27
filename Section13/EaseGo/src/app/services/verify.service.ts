import { Injectable } from '@angular/core';

/**
 * 验证输入服务
 */
@Injectable()
export class VerifyService {

  /**
   * 构造函数
   */
  constructor() {
  }

  /**
   * 验证是否是手机号
   */
  public isMobilePhoneNumber(inputNumber: string): boolean {
    let myVerify = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myVerify.test(inputNumber)) {
      return true;
    } else {
      return false;
    }
  }

}