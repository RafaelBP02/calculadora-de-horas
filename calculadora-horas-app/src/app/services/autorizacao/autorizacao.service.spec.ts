import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AutorizacaoService } from './autorizacao.service';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

describe('AutorizacaoService', () => {
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

  // it('nao deve liberar a rota', () => {
  //   spyOn(service, 'canActivate').and.callThrough();
  //   spyOn(autorizacaoService, 'autenticado').and.returnValue(false);

  //   let mudarRota: boolean;

  //   mudarRota = service.canActivate();

  //   expect(mudarRota).toBeFalsy();
  // });

  it('nao deve autenticar', () => {
      let autenticar: boolean;

      spyOn(browserStorageService, 'get').and.returnValue(null);

      autenticar = service.autenticado();
      expect(autenticar).toBeFalsy();
  })
});
