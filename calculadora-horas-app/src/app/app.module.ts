import { ConfirmationService, MessageService } from 'primeng/api';
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
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ConfigAlertaService } from './services/config-alerta.service';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { UtilitariosService } from './services/utilitarios/utilitarios.service';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    CalcResultDialogComponent,
    HomeComponent,
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
    ToastModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    ConfigAlertaService,
    HttpClient,
    UtilitariosService,
    MessageService,
    {provide: LOCALE_ID, useValue: 'pt',},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
