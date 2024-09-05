import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'calculadora', component: CalculadoraComponent},
  {
    path: 'notify-config',
    loadChildren: () => import('./modules/notify-config/notify-config.module').then(m => m.NotifyConfigModule),
    canActivate: [AuthGuard]
  },
  {path: 'autenticacao', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
