import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigDataComponent } from './notification-config-data.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

describe('NotificationConfigDataComponent', () => {
  let component: NotificationConfigDataComponent;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;
  let fixture: ComponentFixture<NotificationConfigDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationConfigDataComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        ToastModule,
        RouterModule.forRoot([]),
      ],
      providers: [ConfirmationService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationConfigDataComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Formulario validado', () => {
    beforeEach(() => {
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
    it('deve aceitar os dados no dialogo', () => {
      spyOn(component, 'confirmaDadosSalvos').and.returnValue(true);
      spyOn(messageService, 'add');
      spyOn<any>(confirmationService, 'confirm').and.callFake((param: any) => {
        if (param.reject) {
          param.accept(); // should resolve the promise
        }
      });

      component.confirmarDados(new Event('click'));

      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Configurações salvas com sucesso',
      });
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
});
