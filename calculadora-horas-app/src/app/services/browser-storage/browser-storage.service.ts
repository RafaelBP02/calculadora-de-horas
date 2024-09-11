import { Inject, Injectable, InjectionToken } from '@angular/core';

//adaptado de: <https://angular.dev/guide/di/di-in-action>
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => sessionStorage
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  static readonly storageBearerId: string = 'bearerToken';

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}
  get(key: string) {
    return this.storage.getItem(key);
  }
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  cleanMemory(key: string):void {
    this.storage.removeItem(key)
  }
}
