import { BrowserStorageService } from './../../services/browser-storage/browser-storage.service';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private autorizacaoService: AutorizacaoService, private browserStorageService:BrowserStorageService){}

  usuarioLogado():boolean{
    return this.autorizacaoService.autenticado();
  }

}
