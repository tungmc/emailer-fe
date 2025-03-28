import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) {
      return;
    }
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    this.checkStatus(ev);

    switch (ev.status) {
      case 200:
        break;
      case 401:
        const ls = this.injector.get(LocalStorageService);
        ls.clearAll();
        this.goTo('/');
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('An unknown error occurred. This is usually caused by CORS issues or misconfiguration on the server.', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      // url = environment.SERVER_URL + url;
    }
    let newReq = null;
    const localStorageService = this.injector.get(LocalStorageService);
    const accessToken = localStorageService.get('x-access-token');
    newReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-access-token': accessToken ? accessToken : ''
      }
    });
    // 转交处理
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
