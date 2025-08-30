import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationConfigDataComponent } from '../../components/notification-config-data/notification-config-data.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NotifyConfigModule } from './notify-config.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { NotificationFrontComponent } from '../../components/notification-front/notification-front.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request-interceptor.interceptor';

const routes: Routes = [
  {
    path: '',
    component: NotificationConfigDataComponent,
  },
];

@NgModule({
  declarations: [NotificationConfigDataComponent, NotificationFrontComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule

  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  exports: [RouterModule],
})
export class NotifyConfigRoutingModule {}
