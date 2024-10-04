import { UserDTO, UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-gerencia-usuario',
  templateUrl: './adm-gerencia-usuario.component.html',
  styleUrl: './adm-gerencia-usuario.component.css'
})
export class AdmGerenciaUsuarioComponent implements OnInit{

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

}


