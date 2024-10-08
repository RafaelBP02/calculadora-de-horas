import { SortEvent, MessageService } from 'primeng/api';
import { UserDTO, UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adm-gerencia-usuario',
  templateUrl: './adm-gerencia-usuario.component.html',
  styleUrl: './adm-gerencia-usuario.component.css'
})

export class AdmGerenciaUsuarioComponent implements OnInit{
  @ViewChild('dt2') dt2!: Table;

  visivel: boolean = false;

  editForm = new FormGroup({
    localTrabalho: new FormControl<string>('', Validators.required)
  });


  usuarioSelecionado!: UserDTO;

  allUsers: UserDTO[] = [];

  constructor(private usuarioService:UsuarioService, private messageService: MessageService){};

  ngOnInit(): void {
    this.listarTodosUsuarios();
    this.limparUsuarioSelecionado();
  };

  get editFormControl() {
    return this.editForm.controls;
  }

  limparUsuarioSelecionado():void{
    this.usuarioSelecionado = {
      id: 0,
      eMail: 'none',
      name: 'none',
      surename: 'none',
      workplace: 'none',
      role: {id: 0, details: 'none', roleName: 'none' }
    };
    this.editForm.markAsUntouched();
  }

  filterInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.dt2.filterGlobal(value, 'contains');
  }

  showDialog(user: UserDTO){

    this.usuarioSelecionado = user;
    this.editFormControl.localTrabalho.setValue(user.workplace);

    console.log(this.usuarioSelecionado);
    this.visivel = true;
  }

  listarTodosUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.allUsers = usuarios;
      },
      error: (e) => {
        console.log("Erro na listagem dos usuarios" + e.getMessage)
      },
      complete: () => {
        console.log(this.allUsers);

      }
    })
  }

  editarUsuario(event: Event):void{
    event.preventDefault();

    if(this.editForm.valid){
      this.usuarioSelecionado.workplace = this.editFormControl.localTrabalho.value || '';

      this.usuarioService.atualizarDadosUsuarios(this.usuarioSelecionado).subscribe({
        next:() => {
          console.log('sucesso');
          this.listarTodosUsuarios();
          this.limparUsuarioSelecionado();
          this.visivel = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `Usuario ${this.usuarioSelecionado.eMail} atualizado com sucesso!`,
          });
        },
        error:(e)=>{
          console.log(e.getMessage);
        }
      })
    }
    else{
      console.log('preencha os dados obrigatorios')
    }

  }
}


