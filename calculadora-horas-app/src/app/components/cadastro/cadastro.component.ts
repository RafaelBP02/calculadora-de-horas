import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor(private autorizacaoService:AutorizacaoService, private router: Router){}

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

    let novoUsuario: Usuario = new Usuario;

    novoUsuario.id = 0;
    novoUsuario.username = this.cadastroForm.controls.email.value ?? '';
    novoUsuario.name = this.cadastroForm.controls.nome.value ?? '';
    novoUsuario.sureName = this.cadastroForm.controls.sobrenome.value ?? '';
    novoUsuario.password = this.cadastroForm.controls.senha.value ?? '';
    novoUsuario.workPlace = this.cadastroForm.controls.localTrabalho.value ?? '';
    novoUsuario.roleId = 1;

    this.autorizacaoService.efetuarSignup(novoUsuario).subscribe({
      next: () => {
        console.log('sucesso');
        this.router.navigate(['/autenticacao/login']);
      },
      error: (e) => {
        console.error('Erro ao efetuar login:', e);
      }
    })
  }
}
