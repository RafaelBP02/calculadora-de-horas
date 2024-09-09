import { Component } from '@angular/core';
import { AutorizacaoService } from '../../services/autorizacao/autorizacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mensagemLogin: string = '';

  constructor(private autorizacaoService: AutorizacaoService){}

  mostraNomeUsuario():boolean{
    const logado: boolean = this.autorizacaoService.autenticado();
    if(logado)
      this.mensagemLogin = `Bem Vindo ${this.autorizacaoService.decodedUser}!`
    return logado;
  }

}
