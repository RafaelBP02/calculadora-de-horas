import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';

export interface Role{
  id: number,
  roleName: string,
  details: string
}

export interface UserDTO{
  id: number,
  eMail: string,
  name: string,
  surename: string,
  workplace: string,
  role: Role
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { };

  listarUsuarios(): Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(API_ENDPOINTS.TODOS_USUARIOS);
  };

  atualizarDadosUsuarios(userDTO:UserDTO): Observable<UserDTO>{
    return this.http.put<UserDTO>(API_ENDPOINTS.EDITAR_USUARIO, userDTO);
  };

}
