import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  static readonly storageBearerId: string = 'bearerToken';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get(key: string) {
    if (this.isBrowser) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string) {
    if (this.isBrowser) {
      sessionStorage.setItem(key, value);
    }
  }

  cleanMemory(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }
}
