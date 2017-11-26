import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  constructor(private http: Http,
    private jsonp: Jsonp) { }

  ngOnInit() {
    // let params = new URLSearchParams();
    // params.set('callback', '__ng_jsonp__.__req0.finished');
    // this.jsonp.get('http://hq.sinajs.cn/list=' + 'sh601006', { search: params }).subscribe(data => {
    //   console.log(data);
    // });
  }
}


