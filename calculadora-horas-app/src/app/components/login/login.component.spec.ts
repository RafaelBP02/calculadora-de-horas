import { BrowserStorageService } from './../../services/browser-storage/browser-storage.service';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { API_ENDPOINTS } from '../../services/api-endpoints';
import { Router } from 'express';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let autorizacaoService:AutorizacaoService;
  let browserStorageService:BrowserStorageService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        InputTextModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        ButtonModule,
      ],
      providers:[
        AutorizacaoService,
        BrowserStorageService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    autorizacaoService =TestBed.inject(AutorizacaoService);
    browserStorageService = TestBed.inject(BrowserStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve bloquear o envio do formulario', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let btnEnviar: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnLogin')
    ).nativeElement;

    btnEnviar.click();

    fixture.detectChanges();

    expect(compiled.querySelector('form>div>span')?.textContent).toContain('* O e-mail deve ser válido');

  });

  it('deve enviar o formulario', () => {

    spyOn(autorizacaoService,'autenticado').and.returnValue(true);

    component.loginForm.controls.usuario.setValue('UsusarioTest');
    component.loginForm.controls.senha.setValue('testPass123');

    component.configuraHeadersAutorizacao();

    const request = httpTestingController.expectOne(
      (data) =>
        data.url === API_ENDPOINTS.LOGIN && data.method === 'POST'
    );

    request.flush(0);

    expect(request.request.body).toEqual(jasmine.objectContaining({
      username: 'UsusarioTest',
      password: 'testPass123',
    }));

  });

  it('deve tratar o erro do formulario', () => {

    component.loginForm.controls.usuario.setValue('fakeUser');
    component.loginForm.controls.senha.setValue('fakePass');

    component.configuraHeadersAutorizacao();
    const request = httpTestingController.expectOne(
      (data) =>
        data.url === API_ENDPOINTS.LOGIN && data.method === 'POST'
    );

    request.flush({ errorMessage: 'login falhou' }, { status: 401, statusText: 'Unauthorized' });

    expect(component.erroMensagem).toEqual('login falhou')
  });
});
