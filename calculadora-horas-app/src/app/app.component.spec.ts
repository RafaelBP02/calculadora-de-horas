import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { CalcResultDialogComponent } from './components/calc-result-dialog/calc-result-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HttpClient } from '@angular/common/http';
import { ConfigAlertaService } from './services/config-alerta.service';
import { NotificationFrontComponent } from './components/notification-front/notification-front.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputGroupModule,
        InputGroupAddonModule,
        DialogModule,
        DropdownModule,
        ToastModule,
        ToggleButtonModule,
        HttpClientTestingModule

      ],
      declarations: [
        AppComponent,
        CalculadoraComponent,
        CalcResultDialogComponent,
        NotificationFrontComponent

      ],
      providers:[MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calculadora-horas-app'`, () => {
    expect(app.title).toEqual('calculadora-horas-app');
  });

});
