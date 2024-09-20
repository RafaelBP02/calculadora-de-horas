import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request-interceptor.interceptor';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations:[CadastroComponent],
        imports:[
          RouterModule.forRoot([]),
          HttpClientTestingModule,
          CommonModule,
          BrowserModule,
          ConfirmDialogModule,
          InputGroupModule,
          InputGroupAddonModule,
          ReactiveFormsModule
        ],
        providers:[
          BrowserStorageService,
          ConfirmationService,
          provideClientHydration(),
          provideHttpClientTesting(),
          { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formulario valido', () => {
    beforeEach(() => {
      component.cadastroForm.controls.email.setValue('test.user@mail.com');
      component.cadastroForm.controls.nome.setValue('Test');
      component.cadastroForm.controls.sobrenome.setValue('User Surename');
      component.cadastroForm.controls.localTrabalho.setValue('workplace101');
      component.cadastroForm.controls.senha.setValue('senha@123');
      component.cadastroForm.controls.confimarSenha.setValue('senha@123');
    });

    it('deve preparar os dados do formulario', () => {
      const spy = spyOn(component, 'enviarDadosUsuario');

      component.cadastrarUsuario();

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
        id: 0,
        username: 'test.user@mail.com',
        name: 'Test',
        sureName: 'User Surename',
        password: 'senha@123',
        workPlace: 'workplace101',
        roleId: 1
      }));
    })
  });

  it('deve fazer a requisicao REST', () => {
    spyOn(component, 'enviarDadosUsuario').and.callThrough();

    component.cadastrarUsuario();


  })
});
