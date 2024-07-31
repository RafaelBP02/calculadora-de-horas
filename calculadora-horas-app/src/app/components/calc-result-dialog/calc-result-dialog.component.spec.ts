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

    const cabecalho = fixture.nativeElement as HTMLElement;

    expect(cabecalho.querySelector('.content span')).toContain('Hora de Saída');
  });

});
