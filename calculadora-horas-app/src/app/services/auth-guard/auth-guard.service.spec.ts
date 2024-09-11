import { AutorizacaoService } from './../autorizacao/autorizacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuardService', () => {
  let service: AuthGuard;
  let autorizacaoService:AutorizacaoService
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers:[
        AuthGuard
      ]
    });
    service = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    autorizacaoService = TestBed.inject(AutorizacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve liberar a rota', () => {
    spyOn(service, 'canActivate').and.callThrough();
    spyOn(autorizacaoService, 'autenticado').and.returnValue(true);

    let mudarRota: boolean;

    mudarRota = service.canActivate();

    expect(mudarRota).toBeTruthy();
  });

  it('nao deve liberar a rota', () => {
    spyOn(service, 'canActivate').and.callThrough();
    spyOn(autorizacaoService, 'autenticado').and.returnValue(false);

    let mudarRota: boolean;

    mudarRota = service.canActivate();

    expect(mudarRota).toBeFalsy();
  });
});
