import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyConfigRoutingModule } from './notify-config-routing.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NotificationConfigDataComponent } from '../../components/notification-config-data/notification-config-data.component';


@NgModule({
  declarations: [],
  imports: [
    NotifyConfigRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class NotifyConfigModule { }
