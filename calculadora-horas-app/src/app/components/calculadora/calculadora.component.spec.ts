import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

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

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculadoraComponent, CalcResultDialogComponent],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve clicar no botao de cancelar', () => {
    // teste passou mas nao registrou a cobertura em cancelarOperacao()
    spyOn(component, 'cancelarOperacao');

    let btnApagar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnApagar > button')).nativeElement;
    btnApagar.click();

    expect(component.cancelarOperacao).toHaveBeenCalled();
  });

  it('deve calcular a hora',  () => {
    // Essa é a melhor forma de testar ou devo simular a interação com os botões?
    component.cargaSelecionada = { nome: '8 horas', valor: 8 };
    component.calcFormData.entrada = '09:00';
    component.calcFormData.inicioIntervalo = '13:00';
    component.calcFormData.fimIntervalo = '14:00';

    component.calcularHoraio();

    expect(component.horarioSaida.getHours()).toBe(18);
    expect(component.horarioSaida.getMinutes()).toBe(0);
  });
});
