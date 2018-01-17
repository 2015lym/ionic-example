import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BatteryPage } from './battery/battery';
import { WhitelistPagePage } from './whitelist/whitelist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  batteryPage = BatteryPage;
  whitelistPage = WhitelistPagePage;

  constructor(public navCtrl: NavController) {}

}
