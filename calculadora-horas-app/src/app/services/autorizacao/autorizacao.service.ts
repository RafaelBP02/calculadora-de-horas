import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../api-endpoints';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { jwtDecode } from "jwt-decode";
import { Usuario } from '../../models/Usuario';

export interface SubjectBody{
  username: string,
  userId: number
}

export interface LoginUsuario{
  username: string,
  password: string
}

export interface LoginToken{
  token: string
}

export interface DecodedJwt{
  iss: string,
  sub: string,
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {
  decodedUser: string = '';
  decodedUserId: number = 0;

  constructor(private http:HttpClient, private browserStorageService:BrowserStorageService) { }

  //deve retornar o bearer token
  efetuarLogin(login: LoginUsuario):Observable<LoginToken>{
    return this.http.post<LoginToken>(API_ENDPOINTS.LOGIN, login);
  }

  efetuarSignup(signup: Usuario):Observable<any>{
    return this.http.post<LoginToken>(API_ENDPOINTS.SIGNUP, signup);
  }

  autenticado(): boolean {
    const token = this.browserStorageService.get(BrowserStorageService.storageBearerId);
    if (!token) {
      return false;
    }

    try {
      const jwtPayload: DecodedJwt = jwtDecode<DecodedJwt>(token);
      const subObject: SubjectBody = JSON.parse(jwtPayload.sub);
      const currentTime = Math.floor(Date.now() / 1000);

      this.decodedUser = subObject.username;
      this.decodedUserId = subObject.userId;

      return jwtPayload.exp > currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o JWT:', error);
      return false;
    }
  }
}
