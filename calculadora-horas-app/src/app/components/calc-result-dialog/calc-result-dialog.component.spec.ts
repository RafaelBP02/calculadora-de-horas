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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
