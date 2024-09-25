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
import { CadastroComponent } from '../../components/cadastro/cadastro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent}
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
