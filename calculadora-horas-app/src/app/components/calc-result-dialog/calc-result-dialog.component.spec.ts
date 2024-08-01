import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcResultDialogComponent } from './calc-result-dialog.component';

describe('CalcResultDialogComponent', () => {
  let component: CalcResultDialogComponent;
  let fixture: ComponentFixture<CalcResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcResultDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve receber o horario de saida', () => {
    const horario:Date = new Date();

    horario.setHours(18);
    horario.setMinutes(0);
    horario.setSeconds(0);

    component.horaExcedida = false;
    component.horaFinal = horario;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;


    expect(compiled.querySelector('p')?.textContent).toContain(
      '18:00'
    );

  });

});
