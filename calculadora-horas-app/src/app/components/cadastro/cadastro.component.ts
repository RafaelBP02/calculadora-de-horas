import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor( private router: Router){}

  cadastroForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    nome: new FormControl<string>('', Validators.required),
    sobrenome: new FormControl<string>('', Validators.required),
    localTrabalho: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
    confimarSenha: new FormControl<string>('', Validators.required)
  })

  get cadastroFormControl() {
    return this.cadastroForm.controls;
  }

  cadastrarUsuario(event: Event):void{
    event.preventDefault();
    //TODO POST REQUEST
  }
}
