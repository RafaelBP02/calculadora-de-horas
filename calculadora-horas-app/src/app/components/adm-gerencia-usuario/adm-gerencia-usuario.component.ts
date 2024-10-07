import { SortEvent } from 'primeng/api';
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


  usuarioSelecionado: UserDTO = {
    id: 0,
    eMail: 'none',
    name: 'none',
    sureName: 'none',
    workPlace: 'none',
    role: {id: 0, details: 'none', roleName: 'none' }
  };

  allUsers: UserDTO[] = [];

  constructor(private usuarioService:UsuarioService){};

  ngOnInit(): void {
    this.listarTodosUsuarios();
  };

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

  filterInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.dt2.filterGlobal(value, 'contains');
  }

  showDialog(user: UserDTO){

    this.usuarioSelecionado = user;

    console.log(this.usuarioSelecionado);
    this.visivel = true;
  }

  get editFormControl() {
    return this.editForm.controls;
  }

  editarUsuario(event: Event):void{
    event.preventDefault();

    if(this.editForm.valid){
      //TODO request
    }
    else{
      console.log('preencha os dados obrigatorios')
    }

  }
}


