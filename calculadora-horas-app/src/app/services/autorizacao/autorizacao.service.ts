import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../api-endpoints';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';


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

  constructor(private http:HttpClient, private browserStorageService:BrowserStorageService) { }

  //deve retornar o bearer token
  efetuarLogin(login: loginUsuario):Observable<loginToken>{
    return this.http.post<loginToken>(API_ENDPOINTS.LOGIN, login);
  }

  autenticado():boolean {
    return this.browserStorageService.get(BrowserStorageService.storageBearerId) !== null
  }
}
