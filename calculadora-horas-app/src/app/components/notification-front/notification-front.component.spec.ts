import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFrontComponent } from './notification-front.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

describe('NotificationFrontComponent', () => {
  let component: NotificationFrontComponent;
  let fixture: ComponentFixture<NotificationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ToastModule,
        ToggleButtonModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [NotificationFrontComponent],
      providers:[MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('teste com o alerta ligado', () => {
    it('deve ligar os alertas', () => {

    });

    // it('deve testar horario de entrada', () => {});
    // it('deve testar horario de entrada do intervalo', () => {});
    // it('deve testar horario de saida do intervalo', () => {});
    // it('deve testar horario de saida', () => {});
  });

  it('não deve ligar os alertas', () => {

  });
});
