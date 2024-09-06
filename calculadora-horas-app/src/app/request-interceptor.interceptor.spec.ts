import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './request-interceptor.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        }
      ]
    });

     const interceptors = TestBed.inject(HTTP_INTERCEPTORS);
     interceptor = interceptors.find((i) => i instanceof RequestInterceptor) as RequestInterceptor;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
