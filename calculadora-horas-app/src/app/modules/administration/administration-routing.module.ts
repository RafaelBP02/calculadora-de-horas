import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmGerenciaUsuarioComponent } from '../../components/adm-gerencia-usuario/adm-gerencia-usuario.component';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'editar-usuarios', component: AdmGerenciaUsuarioComponent}
];

@NgModule({
  declarations:[AdmGerenciaUsuarioComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ToastModule,
    TableModule,
    InputGroupModule,
    InputGroupAddonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }
