import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AutorizacaoService } from './autorizacao.service';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

describe('AutorizacaoService', () => {
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6IkNlYm9saW5oYSIsImV4cCI6MTcyNTQ2OTY0OX0.2U6q8qvFKDX1kh274jp0A3H6vZWDwB5CRQB_qu0PFo8';
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
    expect(autenticar).toBeFalsy();
});
});
