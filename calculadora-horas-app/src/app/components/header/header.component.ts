import { Component } from '@angular/core';
import { AutorizacaoService } from '../../services/autorizacao/autorizacao.service';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mensagemLogin: string = '';

  constructor(private autorizacaoService: AutorizacaoService, private browserStorageService:BrowserStorageService){}

  mostraNomeUsuario():boolean{
    const logado: boolean = this.autorizacaoService.autenticado();
    if(logado)
      this.mensagemLogin = `Bem Vindo(a) ${this.autorizacaoService.decodedUser}!`
    return logado;
  }

  usuarioLogado():boolean{
    return this.autorizacaoService.autenticado();
  }

  deslogarUsuario():void{
    this.browserStorageService.cleanMemory(BrowserStorageService.storageBearerId)
  }


}
