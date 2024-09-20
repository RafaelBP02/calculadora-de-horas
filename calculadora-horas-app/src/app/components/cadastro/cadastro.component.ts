import { Usuario } from './../../models/Usuario';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  camposIncorretos: boolean = false;

  constructor(
    private autorizacaoService:AutorizacaoService,
    private router: Router,
    private confirmationService: ConfirmationService
  ){}

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

    return senha === confirmarSenha ? null : { senhasNaoIguais: true }
  }

  cadastrarUsuario():void{
    let novoUsuario: Usuario = new Usuario;

    novoUsuario.id = 0;
    novoUsuario.username = this.cadastroForm.controls.email.value ?? '';
    novoUsuario.name = this.cadastroForm.controls.nome.value ?? '';
    novoUsuario.sureName = this.cadastroForm.controls.sobrenome.value ?? '';
    novoUsuario.password = this.cadastroForm.controls.senha.value ?? '';
    novoUsuario.workPlace = this.cadastroForm.controls.localTrabalho.value ?? '';
    novoUsuario.roleId = 1;

    this.enviarDadosUsuario(novoUsuario);

  }

  confirmarDados(event:Event):void{
    if (!this.cadastroForm.valid){
      this.cadastroForm.markAllAsTouched();
      this.camposIncorretos = true;
      console.log('ERRO! CAMPOS DEVEM SER PREENCHIDOS');

      return;
    }

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `<b>${
          this.cadastroForm.controls.nome.value
        }</b>, deseja confirmar o e-mail: <b>${
          this.cadastroForm.controls.email.value
        }</b>?`,
      header: 'Revise seus dados cadastrais',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'ok',
      acceptIcon: 'none',
      rejectLabel: 'cancelar',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.cadastrarUsuario();
      },
      reject: () => {
        console.log("Operação cancelada");
      },
    });
  }

  enviarDadosUsuario(novoUsuario: Usuario):void{
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

}
