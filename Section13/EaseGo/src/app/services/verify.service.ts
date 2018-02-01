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
   * 验证是否是纯数字
   */
  public isNumber(number: string): boolean {
    let myVerify = new RegExp("^[0-9]*$");
    if (myVerify.test(number)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 验证是否是手机号
   */
  public isMobilePhoneNumber(inputNumber: string): boolean {
    let myVerify = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
    if (myVerify.test(inputNumber)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 验证是否是邮箱
   */
  public isEmail(email: string): boolean {
    let myVerify = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (myVerify.test(email)) {
      return true;
    } else {
      return false;
    }
  }

}