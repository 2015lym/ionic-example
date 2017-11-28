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
    this.http.get('/api/list=' + 'sh601006').subscribe(res => {
      console.log(res);
    });
  }
}


