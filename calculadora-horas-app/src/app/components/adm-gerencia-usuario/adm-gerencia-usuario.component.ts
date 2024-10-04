import { SortEvent } from 'primeng/api';
import { UserDTO, UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-adm-gerencia-usuario',
  templateUrl: './adm-gerencia-usuario.component.html',
  styleUrl: './adm-gerencia-usuario.component.css'
})
export class AdmGerenciaUsuarioComponent implements OnInit{
  @ViewChild('dt2') dt2!: Table;

  allUsers: UserDTO[] = [];

  isSorted: boolean = false;

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

}


