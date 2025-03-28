import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/models/core/menuItem';

import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../core/local-storage.service';
import { ServiceResult } from 'src/app/models/core/service-result';

@Injectable({
  providedIn: 'root'
})
export class PlatformCoreService {

  constructor(private http: HttpClient, private store: LocalStorageService) { }

  getDesktop(): { title: string, module: string, power: string, isSelect: boolean } {
    const tabItem = { title: 'Dashboard', module: '/home/dashboard', power: '', isSelect: true };
    return tabItem;
  }

  login(callback: Function, userName: string, password: string, verfiyCode: string): void {
    const sr = new ServiceResult();
    this.http.post('auth/login', 'userName=' + userName).subscribe(res => {
      if (userName !== 'admin') {
        sr.errorCode = -1;
        sr.errorMsg = 'Incorrect username or password';
        callback.call(this, sr);
        return;
      }
      const token = res['token'];
      this.store.set('x-access-token', token);
      callback.call(this, sr);
    });
  }


  logout(callback: Function): void {
    this.http.post('auth/logout', null).subscribe(res => {
      this.store.clearAll();
      callback.call(this);
    });
  }

  getUserInfo(): void {

  }

  getNotifyMessage(): void {

  }
}
