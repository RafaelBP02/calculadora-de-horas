import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { RouterModule } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request-interceptor.interceptor';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers:[
        UsuarioService,
        provideClientHydration(),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
      ]
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
