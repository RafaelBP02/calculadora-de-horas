import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations:[LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
