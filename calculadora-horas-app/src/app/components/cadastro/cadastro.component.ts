import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  camposIncorretos: boolean = false;

  constructor(private autorizacaoService:AutorizacaoService, private router: Router){}

  cadastroForm = new FormGroup(
    {
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      nome: new FormControl<string>('', [Validators.required, Validators.pattern('^[A-Z a-z]+')]),
      sobrenome: new FormControl<string>('', [Validators.required, Validators.pattern('^[A-Z a-z]+')]),
      localTrabalho: new FormControl<string>('', Validators.required),
      senha: new FormControl<string>('', Validators.required),
      confimarSenha: new FormControl<string>('', Validators.required)
    },
    { validators: this.senhasIguaisValidator}
  );

  get cadastroFormControl() {
    return this.cadastroForm.controls;
  }


  senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confimarSenha')?.value;

    if (senha === undefined || confirmarSenha === undefined) {
      return null;
    }

    if (senha === confirmarSenha) {
      return null;
    }

    return { senhasNaoIguais: true };
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

    if (this.cadastroForm.valid){
      this.autorizacaoService.efetuarSignup(novoUsuario).subscribe({
        next: () => {
          console.log('sucesso');
          this.router.navigate(['/autenticacao/login']);
        },
        error: (e) => {
          console.error('Erro ao efetuar login:', e);
        },
        complete: () => {
          this.camposIncorretos = false;
        }
      })
    }
    else{
      this.cadastroForm.markAllAsTouched();
      this.camposIncorretos = true;
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS');
    }


  }
}
