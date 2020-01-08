import { LocalStorageService } from 'angular-web-storage';
import { ExpiredUnit } from 'angular-web-storage/src/util';
import { appSettings } from 'src/environments/app.settings';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private appKey: string;

  constructor(private localStorageService: LocalStorageService) {
    this.appKey = `${appSettings.name}-${appSettings.environment}`;
  }

  set(key: string, value: any, expires: number = 0, expiredUnit: ExpiredUnit = 'h'): void {
    this.localStorageService.set(`${this.appKey}-${key}`, value, expires, expiredUnit);
  }

  remove(key: string): void {
    this.localStorageService.remove(`${this.appKey}-${key}`);
  }

  get(key: string): any {
    return this.localStorageService.get(`${this.appKey}-${key}`);
  }

  clear() {
    this.localStorageService.clear();
  }
}
