import { NotifyConfigRoutingModule } from './modules/notify-config/notify-config-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalcResultDialogComponent } from './components/calc-result-dialog/calc-result-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ConfigAlertaService } from './services/config-alerta.service';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { NotificationComponent } from './components/notification/notification.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    CalcResultDialogComponent,
    NotificationComponent
  ],
  imports: [
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
    TooltipModule,
    ToastModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    ConfigAlertaService,
    MessageService,
    HttpClient,
    {provide: LOCALE_ID, useValue: 'pt',},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
