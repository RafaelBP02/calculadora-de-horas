import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpRequest, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './request-interceptor.interceptor';
import { BrowserStorageService } from './services/browser-storage/browser-storage.service';

describe('RequestInterceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: RequestInterceptor;
  let browserStorageService: BrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RequestInterceptor,
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        BrowserStorageService
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(RequestInterceptor);
    browserStorageService = TestBed.inject(BrowserStorageService);
  });

  it('deve adicionar o header de autorizacao', () => {
    spyOn(browserStorageService, 'get').and.returnValue('token');

    const req = new HttpRequest('GET', 'http://localhost/api');
    const handleSpy = jasmine.createSpy('handle');

    interceptor.intercept(req, <any>{ handle: handleSpy });

    expect(handleSpy).toHaveBeenCalledWith(req.clone({
      headers: req.headers.set('Authorization', 'Bearer token')
    }));
  });
});

