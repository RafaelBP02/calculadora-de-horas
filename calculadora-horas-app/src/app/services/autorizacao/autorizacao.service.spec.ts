import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AutorizacaoService } from './autorizacao.service';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

describe('AutorizacaoService', () => {
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6IntcInVzZXJuYW1lXCI6XCJNYWdhbGlcIixcInVzZXJJZFwiOjZ9IiwiZXhwIjoxNzI2MjQxMDMzfQ.C14x07oBcxHe4smj590GAcgvOBQJC2_6cP9L-8pzOOQ';
  let service: AutorizacaoService;
  let browserStorageService:BrowserStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers:[
        BrowserStorageService
      ]
    });
    service = TestBed.inject(AutorizacaoService);
    browserStorageService = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('nao deve autenticar', () => {
      let autenticar: boolean;

      spyOn(browserStorageService, 'get').and.returnValue(null);

      autenticar = service.autenticado();
      expect(autenticar).toBeFalsy();
  })

  it('deve validar o token', () => {
    let autenticar: boolean;

    spyOn(browserStorageService, 'get').and.returnValue(token);

    autenticar = service.autenticado();
    expect(autenticar).toBeTruthy();
});
});
