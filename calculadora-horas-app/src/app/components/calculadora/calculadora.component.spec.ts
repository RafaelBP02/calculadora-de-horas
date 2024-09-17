import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { CalculadoraComponent, DuracaoTrabalho } from './calculadora.component';
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
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificationConfigDataComponent } from '../notification-config-data/notification-config-data.component';
import { HttpClient } from '@angular/common/http';
import { ConfigAlertaService } from '../../services/config-alerta.service';

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
      providers:[
        ConfirmationService,
        MessageService,
        HttpClient,
        ConfigAlertaService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve clicar no botao de cancelar', () => {
    component.calcFormData.markAsDirty();

    expect(component.calcFormData.pristine).toBeFalsy();

    let btnApagar: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnApagar > button')
    ).nativeElement;

    btnApagar.click();

    fixture.detectChanges();

    expect(component.calcFormData.pristine).toBeTruthy();

  });

  it('deve carregar o dropdown', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#workloadDropDown>span')?.textContent).toContain('Selecione sua carga horaria');
  });

  it('deve mostrar o dialogo', () => {
    component.displayDialog();
    fixture.detectChanges();

    expect(component.visible).toBeTruthy();
  });

  describe('teste dos inputs da aplicação', () => {

    it('deve clicar no input entrada', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#entrada')
      ).nativeElement;
      inputElement.value = '08:00';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.get('entrada')?.value).toEqual('08:00');
    });
    it('deve clicar no input inicio Intervalo', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#inicioInt')
      ).nativeElement;
      inputElement.value = '13:35';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.get('inicioIntervalo')?.value).toEqual('13:35');
    });
    it('deve clicar no input fim intervalo', () => {
      const inputElement = fixture.debugElement.query(
        By.css('#fimInt')
      ).nativeElement;
      inputElement.value = '14:36';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.calcFormData.get('fimIntervalo')?.value).toEqual('14:36');
    });
  });

  describe('logica da caluladora de horas saida', () => {
    beforeEach(() => {

      component.calcFormData.controls['entrada'].setValue('09:00');
      component.calcFormData.controls['inicioIntervalo'].setValue('15:00');
      component.calcFormData.controls['fimIntervalo'].setValue('16:00');
    });


    it('deve calcular a hora com carga de trabalho normal', () => {
      component.calcFormData.controls['cargaHorariaSelecionada'].setValue({
        nome: '8 horas',
        valor: 8,
      });

      spyOn(component, 'displayDialog');

      fixture.detectChanges();

      component.calcularHoraio(new Event('submit'));

      fixture.detectChanges();

      expect(component.horarioCalculado.getHours()).toBe(18);
      expect(component.horarioCalculado.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeFalsy();
      expect(component.displayDialog).toHaveBeenCalled();
    });
    it('deve calcular a hora com carga de trabalho execedida', () => {
      component.calcFormData.controls['cargaHorariaSelecionada'].setValue({
        nome: '4 horas',
        valor: 4,
      });

      spyOn(component, 'displayDialog');

      fixture.detectChanges();

      component.calcularHoraio(new Event('submit'));

      fixture.detectChanges();

      expect(component.horarioCalculado.getHours()).toBe(13);
      expect(component.horarioCalculado.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeTruthy();
    });
      });

  describe('logica do calculo da hora de entrada', () => {
    beforeEach(() => {
      component.calcFormData.controls['inicioIntervalo'].setValue('13:00');
      component.calcFormData.controls['fimIntervalo'].setValue('14:00');
      component.calcFormData.controls['saida'].setValue('18:00');
    });

    it('deve calcular a hora de entrada com carga horaria de 8 horas', () => {
      component.calcFormData.controls['cargaHorariaSelecionada'].setValue({
        nome: '8 horas',
        valor: 8,
      });

      spyOn(component, 'displayDialog');

      fixture.detectChanges();

      component.calcularHoraio(new Event('submit'));

      fixture.detectChanges();

      expect(component.horarioCalculado.getHours()).toBe(9);
      expect(component.horarioCalculado.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeFalsy();
      expect(component.displayDialog).toHaveBeenCalled();
    })

    it('deve calcular a hora excedida com carga horaria de 4 horas', () => {
      component.calcFormData.controls['cargaHorariaSelecionada'].setValue({
        nome: '4 horas',
        valor: 4,
      });

      spyOn(component, 'displayDialog');

      fixture.detectChanges();

      component.calcularHoraio(new Event('submit'));

      fixture.detectChanges();

      expect(component.horarioCalculado.getHours()).toBe(14);
      expect(component.horarioCalculado.getMinutes()).toBe(0);
      expect(component.horaExcedida).toBeTruthy();
      expect(component.displayDialog).toHaveBeenCalled();
    })
  })
});
