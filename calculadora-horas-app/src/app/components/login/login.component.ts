import { BrowserStorageService } from './../../services/browser-storage/browser-storage.service';
import { UtilitariosService } from './../../services/utilitarios/utilitarios.service';
import { AutorizacaoService, loginUsuario } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private autorizacaoService: AutorizacaoService, private browserStorageService:BrowserStorageService){}

  loginForm = new FormGroup({
    usuario: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required)
  })

  logarUsuario(event: Event):void{
    event.preventDefault();

    if (this.loginForm.valid) {
      try {
        this.configuraHeadersAutorizacao();
      } catch (error) {
        console.log('Este usuario nao existe')
      }
    } else {
      this.loginForm.markAllAsTouched();
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS');
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  configuraHeadersAutorizacao():void{
    const usuario: loginUsuario = {
      username: this.loginForm.controls.usuario.value || '',
      password: this.loginForm.controls.senha.value || '',
    };
    this.autorizacaoService.efetuarLogin(usuario).subscribe({
      next: (bearearToken) => {
        this.browserStorageService.set(BrowserStorageService.storageBearerId, bearearToken.token);
        console.log('bem vindo');

        console.log('bearer: ' + this.browserStorageService.get(BrowserStorageService.storageBearerId));
      },
      error: (e: any) => {
        console.error('Erro ao efetuar login:', e);

      },
    });
  }



}


