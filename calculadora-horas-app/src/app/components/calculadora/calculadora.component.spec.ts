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

    spyOn(component, 'cancelarOperacao');

    let btnApagar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnApagar > button')).nativeElement;
    btnApagar.click();

    expect(component.cancelarOperacao).toHaveBeenCalled();
  });

  xit('deve abrir o modal', async () => {
    const horario: Date = new Date();
    const btnConfirmar = fixture.debugElement.query(By.css('#btnCalcular'));
    const compiled = fixture.nativeElement as HTMLElement;

    horario.setHours(18);
    horario.setMinutes(0);
    horario.setSeconds(0);

    component.horaExcedida = false;
    component.horarioSaida = horario;

    spyOn(component, 'displayDialog').and.callThrough();

    btnConfirmar.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.displayDialog).toHaveBeenCalled();

    expect(component.visible).toBeTrue();

    const dialogText = compiled.querySelector('p-dialog span')?.textContent;
    expect(dialogText).toContain('Hora trabalhada excedida!');
  });
});
