import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGerenciaUsuarioComponent } from './adm-gerencia-usuario.component';

describe('AdmGerenciaUsuarioComponent', () => {
  let component: AdmGerenciaUsuarioComponent;
  let fixture: ComponentFixture<AdmGerenciaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmGerenciaUsuarioComponent]
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
