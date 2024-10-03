import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmGerenciaUsuarioComponent } from '../../components/adm-gerencia-usuario/adm-gerencia-usuario.component';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path:'editar-usuarios', component: AdmGerenciaUsuarioComponent}
];

@NgModule({
  declarations:[AdmGerenciaUsuarioComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ToastModule,
  ],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
