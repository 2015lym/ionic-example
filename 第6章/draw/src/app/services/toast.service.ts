import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * toast提示框服务
 */
@Injectable()
export class ToastService {

  /**
   * 构造函数
   */
  constructor(private toastCtrl: ToastController) {}

  /**
   * 弹出提示框
   */
  show(message: string, duration?: number, position?: string): void {
    if (message != null && message !== '') {
      if (duration == null) {
        duration = 3000;
      }
      if (position == null) {
        position = 'bottom';
      }
      let toast = this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        cssClass: 'icmp-toast'
      });
      toast.present();
    }
  }
}
