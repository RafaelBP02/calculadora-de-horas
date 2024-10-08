import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDTO } from './../../services/usuario/usuario.service';

import { AdmGerenciaUsuarioComponent } from './adm-gerencia-usuario.component';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request-interceptor.interceptor';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { API_ENDPOINTS } from '../../services/api-endpoints';

export const dadosUsuariosTeste: UserDTO[] = [
  {
    id: 1,
    eMail: 'tester.um@mail.com',
    name: 'Tester1',
    surename: 'Silva',
    workplace: 'TestPlace',
    role: {
      id: 1,
      roleName: 'ADMINISTRADOR',
      details: 'teste'
    }
  },
  {
    id: 2,
    eMail: 'tester.dois@mail.com',
    name: 'Tester2',
    surename: 'Rezende',
    workplace: 'TestPlace',
    role: {
      id: 2,
      roleName: 'USUARIO',
      details: 'teste'
    }
  },
  {
    id: 3,
    eMail: 'tester.tres@mail.com',
    name: 'Tester3',
    surename: 'Carvalho',
    workplace: 'TestPlace',
    role: {
      id: 2,
      roleName: 'USUARIO',
      details: 'teste'
    }
  }
];

export const testeUsuarioSelecionado: UserDTO = {
  id: 3,
  eMail: 'tester.tres@mail.com',
  name: 'Tester3',
  surename: 'Carvalho',
  workplace: 'TestPlace',
  role: {
    id: 2,
    roleName: 'USUARIO',
    details: 'teste'
  }
}

describe('AdmGerenciaUsuarioComponent', () => {
  let component: AdmGerenciaUsuarioComponent;
  let fixture: ComponentFixture<AdmGerenciaUsuarioComponent>;
  let usuarioService: UsuarioService;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmGerenciaUsuarioComponent],
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        TableModule,
        DialogModule,
        ButtonModule
      ],
      providers:[
        UsuarioService,
        MessageService,
        provideClientHydration(),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmGerenciaUsuarioComponent);
    usuarioService = TestBed.inject(UsuarioService);
    messageService = TestBed.inject(MessageService);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveUtilizarFiltroGlobal', () => {

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input[type="text"]');
    const filterGlobalSpy = spyOn(component.dt2, 'filterGlobal').and.callThrough();

    inputElement.value = 'Carvalho';
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));

    expect(filterGlobalSpy).toHaveBeenCalledWith('Carvalho', 'contains');
  })

  it('deve listar todos os usuarios', () => {

    const request = httpTestingController.expectOne(
      (data) =>
        data.url === API_ENDPOINTS.TODOS_USUARIOS && data.method === 'GET'
    );

    request.flush(dadosUsuariosTeste);

    component.listarTodosUsuarios();

    expect(component.allUsers).toEqual(dadosUsuariosTeste);

  })
});
