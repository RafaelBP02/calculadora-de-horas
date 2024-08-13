import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigDataComponent } from './notification-config-data.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_ENDPOINTS } from '../../services/api-endpoints';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ConfigAlerta } from '../../models/ConfigAlerta';
import { mockAllAlerts } from './notification-config-data.component.stub';

describe('NotificationConfigDataComponent', () => {
  let component: NotificationConfigDataComponent;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;
  let fixture: ComponentFixture<NotificationConfigDataComponent>;
  let httpTestingController: HttpTestingController;
  let configAlertaService: ConfigAlertaService;

  beforeEach(async () => {
    registerLocaleData(ptBr);

    await TestBed.configureTestingModule({
      declarations: [NotificationConfigDataComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        ToastModule,
        InputGroupModule,
        InputGroupAddonModule,
        DropdownModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        ConfirmationService,
        MessageService,
        ConfigAlertaService,
        { provide: LOCALE_ID, useValue: 'pt' },
        //provideHttpClientTesting() > nao funciona o Angular recomenda usar isso no lugar de HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationConfigDataComponent);

    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    messageService = TestBed.inject(MessageService);
    configAlertaService = TestBed.inject(ConfigAlertaService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Formulario validado', () => {
    beforeEach(() => {
      component.horariosForm.controls.cargaHorariaSelecionada.setValue({
        nome: '8 horas',
        valor: 8,
      });
      component.horariosForm.controls.inicioExpediente.setValue('09:00');
      component.horariosForm.controls.inicioIntervalo.setValue('13:00');
      component.horariosForm.controls.fimIntervalo.setValue('14:00');
      component.horariosForm.controls.fimExpediente.setValue('18:00');
    });

    it('deve confirmar os dados', () => {
      expect(component.confirmaDadosSalvos()).toBeTruthy();
    });
    it('deve abrir dialogo', () => {
      spyOn(confirmationService, 'confirm');
      component.confirmarDados(new Event('click'));
      expect(confirmationService.confirm).toHaveBeenCalled();
    });

    it('deve rejeitar os dados no dialogo', () => {
      spyOn(component, 'confirmaDadosSalvos').and.returnValue(true);
      spyOn(messageService, 'add');
      spyOn<any>(confirmationService, 'confirm').and.callFake((params: any) => {
        if (params.reject) {
          params.reject();
        }
      });

      component.confirmarDados(new Event('click'));

      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro!',
        detail: 'A Operação foi cancelada',
        life: 3000,
      });
    });
  });

  describe('Formulario nao validado', () => {
    it('deve cancelar os dados', () => {
      expect(component.confirmaDadosSalvos()).toBeFalsy();
    });
    it('nao deve abrir o dialogo', () => {
      component.confirmarDados(new Event('click'));
      expect(component.confirmaDadosSalvos()).toBeFalsy();
    });
  });

  describe('Requisicoes API', () => {
    beforeEach(() => {});

    it('deve selecionar todas as configuracoes de alertas', () => {
      const request = httpTestingController.expectOne(
        (data) =>
          data.url === API_ENDPOINTS.BACKEND_URL && data.method === 'GET'
      );

      request.flush(mockAllAlerts);

      expect(component.alertas).toHaveSize(2);
      expect(component.alertas[0]).toEqual({
        id: 1,
        workEntry: '10:00:00',
        intervalBeginning: '13:00:00',
        intervalEnd: '14:00:00',
        workEnd: '18:00:00',
        workload: 6,
        user_id: 1,
      });
      expect(component.alertas[1]).toEqual({
        id: 2,
        workEntry: '07:00:00',
        intervalBeginning: '12:00:00',
        intervalEnd: '12:30:00',
        workEnd: '18:00:00',
        workload: 6,
        user_id: 2,
      });
    });

    it('deve cadastrar um novo alarme', async () => {
      component.horariosForm.controls.cargaHorariaSelecionada.setValue({
        nome: '8 horas',
        valor: 8,
      });
      component.horariosForm.controls.inicioExpediente.setValue('11:00');
      component.horariosForm.controls.inicioIntervalo.setValue('13:00');
      component.horariosForm.controls.fimIntervalo.setValue('14:00');
      component.horariosForm.controls.fimExpediente.setValue('18:00');

      spyOn(component, 'confirmaDadosSalvos').and.returnValue(true);
      spyOn(messageService, 'add');
      spyOn<any>(confirmationService, 'confirm').and.callFake((param: any) => {
        if (param.accept) {
          param.accept();
        }
      });

      component.confirmarDados(new Event('click'));

      const request = httpTestingController.expectOne(
        (data) =>
          data.url === API_ENDPOINTS.BACKEND_URL && data.method === 'POST'
      );

      expect(request.request.body).toEqual(jasmine.objectContaining({
        id: 0,
        workEntry: '11:00:00',
        intervalBeginning: '13:00:00',
        intervalEnd: '14:00:00',
        workEnd: '18:00:00',
        workload: 8,
        user_id: 0,
      }));

      request.flush(0);
    });

    xit('deve aceitar os dados no dialogo', () => {
      spyOn(component, 'confirmaDadosSalvos').and.returnValue(true);
      spyOn(messageService, 'add');
      spyOn<any>(confirmationService, 'confirm').and.callFake((param: any) => {
        if (param.accept) {
          param.accept();
        }
      });

      component.confirmarDados(new Event('click'));

      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Configurações salvas com sucesso',
      });
    });

    xit('deve atualizar o formulario existente', () => {
      spyOn<any>(component, 'atualizarAlertaConfigurado').and.callThrough();

      component.reqAlertaExiste = true;
      component.horariosForm.controls.inicioExpediente.setValue('11:00');

      fixture.detectChanges();

      const btn = fixture.debugElement.query(
        By.css('#btn-request')
      ).nativeElement;

      btn.click();

      expect((component as any).atualizarAlertaConfigurado).toHaveBeenCalled();
    });
  });
});
