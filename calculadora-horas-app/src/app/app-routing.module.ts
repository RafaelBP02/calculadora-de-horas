import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';

const routes: Routes = [
  { path: '', component: CalculadoraComponent},
  {path: 'notifyConfig', loadChildren: () => import('./modules/notify-config/notify-config.module').then(m => m.NotifyConfigModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
