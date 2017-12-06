import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  private stockItems: Array<Object> = [];

  constructor(private http: Http,
    private jsonp: Jsonp) { }

  ngOnInit() {
    // 创造两条假数据
    this.addStockInfo('sh601006');
    this.addStockInfo('sz002139');
  }

  /**
   * 增加股票信息
   */
  addStockInfo(stockCode: string) {
    this.http.get('/api/list=' + stockCode).subscribe(res => {
      let data: Array<string> = res['_body'].split(',');
      if (data.length < 31) {
        alert('请输入正确的股票代码');
        return;
      }

      let stoke: Object = {};
      let name: string = data[0].split('="')[1];
      let closePrice: number = parseFloat(data[2]);
      let currentPrice: number = parseFloat(data[3]);
      let changeAmount: number = parseFloat((currentPrice - closePrice).toFixed(2));
      stoke['code'] = stockCode;
      stoke['name'] = name;
      stoke['changePercent'] = changeAmount / closePrice;
      stoke['changeAmount'] = changeAmount;
      stoke['currentPrice'] = currentPrice;
      stoke['closePrice'] = closePrice;
      stoke['openPrice'] = data[1];
      this.stockItems.push(stoke);

    });
  }

  /**
   * 移除股票信息
   */
  removeStockInfo(item: Object) {
    for (let i = 0; i < this.stockItems.length; i++) {
      if (this.stockItems[i] === item) {
        this.stockItems.splice(i, 1);
        break;
      }
    }
  }

}


