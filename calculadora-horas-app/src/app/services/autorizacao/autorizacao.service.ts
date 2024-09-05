import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../api-endpoints';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { jwtDecode } from "jwt-decode";

export interface loginUsuario{
  username: string,
  password: string
}

export interface loginToken{
  token: string
}

export interface decodedJwt{
  iss: string,
  sub: string,
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  constructor(private http:HttpClient, private browserStorageService:BrowserStorageService) { }

  //deve retornar o bearer token
  efetuarLogin(login: loginUsuario):Observable<loginToken>{
    return this.http.post<loginToken>(API_ENDPOINTS.LOGIN, login);
  }

  autenticado(): boolean {
    const token = this.browserStorageService.get(BrowserStorageService.storageBearerId);
    if (!token) {
      return false;
    }

    try {
      const jwtPayload: decodedJwt = jwtDecode<decodedJwt>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(jwtPayload.exp + ' e ' + currentTime);

      return jwtPayload.exp > currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o JWT:', error);
      return false;
    }
  }
}
