import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserStorageService } from './services/browser-storage/browser-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private browserStorageService: BrowserStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const ignorePattern = /^auth\//;

    if (!request.url.includes('auth')) {
      console.log('entrou! url:'+ request.url)
      const token = this.browserStorageService.get(BrowserStorageService.storageBearerId);
      if (token) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }

    return next.handle(request);
  }
}
