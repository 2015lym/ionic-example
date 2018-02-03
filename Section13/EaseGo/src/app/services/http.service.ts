import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, URLSearchParams, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


/**
 * HTTP 请求拦截器
 */
@Injectable()
export class HttpService extends Http {

  // 根地址
  public baseUrl = 'http://192.168.0.158:3000/';
  // public baseUrl = 'http://172.168.4.227:3000/';

  /**
   * 构造函数
   */
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  /**
   * 请求拦截器
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let urlStr: string = '';
    if (typeof url === 'string') {
      urlStr = url;
    } else {
      urlStr = url['url'];
    }

    if (this.needContextPrefix(urlStr)) {
      typeof url === 'string' ? (url = this.baseUrl + 'api/v1/' + url) : (url['url'] = this.baseUrl + 'api/v1/' + url['url']);
    }
    return this.intercept(super.request(url, options), false);
  }

  /**
   * get拦截器
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs('get', options)), true);
  }

  /**
   * put拦截器
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    if (body == null) {
      body = new URLSearchParams();
    }
    return this.intercept(super.put(url, body.toString(), this.getRequestOptionArgs('put', options)), true);
  }

  /**
   * post拦截器
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    if (body == null) {
      body = new URLSearchParams();
    }
    return this.intercept(super.post(url, body.toString(), this.getRequestOptionArgs('post', options)), true);
  }

  /**
   * file post拦截器
   */
  filePost(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    if (body == null) {
      body = new URLSearchParams();
    }
    return this.intercept(super.post(url, body, this.getRequestOptionArgs('post', options)), true);
  }

  /**
   * delete拦截器
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs('delete', options)), true);
  }

  /**
   * 判断是否需求在请求地址前加上IP地址
   */
  needContextPrefix(url: string): boolean {
    return !(url.indexOf('./assets') === 0 || url.indexOf('http') === 0);
  }

  /**
   * 添加请求头信息
   */
  getRequestOptionArgs(type: string, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
      if (type === 'post' || type === 'put') {
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      }
    }
    return options;
  }

  /**
   * 捕获应答异常并处理
   */
  intercept(observable: Observable<Response>, isReqType: boolean): Observable<Response> {
    if (isReqType) {
      observable = observable.do((res: Response) => {
      }, (res) => {

        if (res.status === -1 || res.status === 0) {
          res._body = '网络异常，请稍后再试';
        } else if (res.status === 401) {
          res._body = null;
        } else if (res.status === 404) {
          res._body = '资源未找到';
        } else if (res.status === 502) {
          res._body = '网络异常';
        } else if (res.status === 503) {
          res._body = '连接数过多，请稍后...';
        } else {
          if (res._body != null && /\w+[\s\.]\w+/.test(res._body)) {
            res._body = '系统异常';
          }
        }
      });
    }
    return observable;
  }
}
