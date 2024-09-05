import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutorizacaoService } from '../autorizacao/autorizacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private autorizacao: AutorizacaoService, private router: Router) {}

  canActivate(): boolean {
    if (this.autorizacao.autenticado()) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/autenticacao/login']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
