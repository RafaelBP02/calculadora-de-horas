import { BrowserStorageService } from './../../services/browser-storage/browser-storage.service';
import { UtilitariosService } from './../../services/utilitarios/utilitarios.service';
import { AutorizacaoService, LoginUsuario } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  erroMensagem: string = '';

  constructor(private autorizacaoService: AutorizacaoService, private browserStorageService:BrowserStorageService, private router: Router){}

  loginForm = new FormGroup({
    usuario: new FormControl<string>('', [Validators.required, Validators.email]),
    senha: new FormControl<string>('', Validators.required)
  })

  logarUsuario(event: Event):void{
    event.preventDefault();

    if (this.loginForm.valid) {
      this.configuraHeadersAutorizacao();
    } else {
      this.loginForm.markAllAsTouched();
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS');
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  configuraHeadersAutorizacao():void{
    const usuario: LoginUsuario = {
      username: this.loginForm.controls.usuario.value || '',
      password: this.loginForm.controls.senha.value || '',
    };
    this.autorizacaoService.efetuarLogin(usuario).subscribe({
      next: (bearearToken) => {
        this.browserStorageService.set(BrowserStorageService.storageBearerId, bearearToken.token);
        console.log('bem vindo');

        console.log('bearer: ' + this.browserStorageService.get(BrowserStorageService.storageBearerId));
      },
      error: (e) => {
        this.erroMensagem = e.error.errorMessage;
        console.log(e);

      },
      complete: () => {
        if (this.autorizacaoService.autenticado()) {
          this.router.navigate(['/']);
        }
        this.erroMensagem = '';
      }
    });
  }



}


