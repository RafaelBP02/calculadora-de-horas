import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

describe('AdmGerenciaUsuarioComponent', () => {
  let component: AdmGerenciaUsuarioComponent;
  let fixture: ComponentFixture<AdmGerenciaUsuarioComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
