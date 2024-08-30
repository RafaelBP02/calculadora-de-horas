import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl<String>('', Validators.required),
    senha: new FormControl<String>('', Validators.required)
  })

  logarUsuario(event: Event):void{
    event.preventDefault();

    if (this.loginForm.valid) {
      console.log('tenta fazer loggin...')
    //TODO realizar logica para loggin
    } else {
      this.loginForm.markAllAsTouched();
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS');
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }


}
