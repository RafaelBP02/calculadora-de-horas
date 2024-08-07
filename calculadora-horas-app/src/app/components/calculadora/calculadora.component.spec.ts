import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { CalculadoraComponent } from './calculadora.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcResultDialogComponent } from '../calc-result-dialog/calc-result-dialog.component';
import { By } from '@angular/platform-browser';
import { Calculadora } from '../../models/Calculadora';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificationConfigDataComponent } from '../notification-config-data/notification-config-data.component';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculadoraComponent, CalcResultDialogComponent, NotificationConfigDataComponent],
      imports: [
        ButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputGroupModule,
        InputGroupAddonModule,
        DialogModule,
        DropdownModule,
        RouterModule.forRoot([])
      ],
      providers:[ConfirmationService, MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct routerLink on configuration icon', () => {
    //TODO: teste para verificar mudança de url para /notify-config
  });

  it('deve clicar no botao de cancelar', () => {
    let btnApagar: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnApagar > button')
    ).nativeElement;
    btnApagar.click();

    expect(component.calcFormData).toEqual(new Calculadora());
  });

  describe('teste dos inputs da aplicação', () => {
    it('deve carregar o dropdown', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.querySelector('span')?.textContent).toContain('Selecione uma carga horaria');
    });
    it('deve clicar no input entrada', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#entrada')
      ).nativeElement;
      inputElement.value = '08:00';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.entrada).toEqual('08:00');
    });
    it('deve clicar no input inicio Intervalo', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#inicioInt')
      ).nativeElement;
      inputElement.value = '13:35';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.inicioIntervalo).toEqual('13:35');
    });
    it('deve clicar no input fim intervalo', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#fimInt')
      ).nativeElement;
      inputElement.value = '14:36';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.fimIntervalo).toEqual('14:36');
    });
  });

  describe('logica da caluladora de horas', () => {
    beforeEach(() => {
      component.calcFormData.entrada = '09:00';
      component.calcFormData.inicioIntervalo = '13:00';
      component.calcFormData.fimIntervalo = '14:00';
    });

    it('deve calcular a hora com carga de trabalho normal', () => {
      component.cargaSelecionada = { nome: '8 horas', valor: 8 };

      component.calcularHoraio();

      expect(component.horarioSaida.getHours()).toBe(18);
      expect(component.horarioSaida.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeFalsy();
    });
    it('deve calcular a hora com carga de trabalho execedida', () => {
      component.cargaSelecionada = { nome: '4 horas', valor: 4 };

      component.calcularHoraio();

      expect(component.horarioSaida.getHours()).toBe(13);
      expect(component.horarioSaida.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeTruthy();
    });
  });
});
