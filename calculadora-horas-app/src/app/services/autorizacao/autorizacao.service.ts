import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../api-endpoints';
import { Observable } from 'rxjs';


export interface loginUsuario{
  username: string,
  password: string
}

export interface loginToken{
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  constructor(private http:HttpClient) { }

  //deve retornar o bearer token
  efetuarLogin(login: loginUsuario):Observable<loginToken>{
    return this.http.post<loginToken>(API_ENDPOINTS.LOGIN, login);
  }
}
