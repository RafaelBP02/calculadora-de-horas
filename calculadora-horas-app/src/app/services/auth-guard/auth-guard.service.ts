import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutorizacaoService } from '../autorizacao/autorizacao.service';

//Adaptado de: <https://medium.com/@hish.abdelshafouk/route-guards-in-angular-c9da0d815ef4>

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private autorizacao: AutorizacaoService, private router: Router) {}

  canActivate(): boolean {
    if (this.autorizacao.autenticado()) {
      return true;
    } else {
      this.router.navigate(['/autenticacao/login']);
      return false;
    }
  }
}
