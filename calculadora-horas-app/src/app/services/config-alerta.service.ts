import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigAlerta } from '../models/ConfigAlerta';
import { API_ENDPOINTS } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConfigAlertaService {

  constructor(private http:HttpClient) { }

  adicionarAlerta(dadosAlerta:ConfigAlerta):Observable<ConfigAlerta>{
    return this.http.post<ConfigAlerta>(API_ENDPOINTS.BACKEND_URL, dadosAlerta);
  }

  atualizarAlerta(dadosAlerta:ConfigAlerta):Observable<ConfigAlerta>{
    return this.http.put<ConfigAlerta>(API_ENDPOINTS.BACKEND_URL, dadosAlerta);
  }

  selecionarTodosAlertas():Observable<ConfigAlerta[]>{
    return this.http.get<ConfigAlerta[]>(API_ENDPOINTS.BACKEND_URL);
  }

  selecionarAlerta(id: number):Observable<ConfigAlerta>{
    return this.http.get<ConfigAlerta>(API_ENDPOINTS.BACKEND_URL + '/' + id);
  }


}
