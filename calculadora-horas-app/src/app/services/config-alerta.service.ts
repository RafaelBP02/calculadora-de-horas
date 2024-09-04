import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigAlerta } from '../models/ConfigAlerta';
import { API_ENDPOINTS } from './api-endpoints';
import { UtilitariosService } from './utilitarios/utilitarios.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigAlertaService {

  constructor(private http:HttpClient) { }

  adicionaHeader(): HttpHeaders{
    return new HttpHeaders().set('Authorization', `Bearer ${UtilitariosService.getToken()}`);
  }

  adicionarAlerta(dadosAlerta:ConfigAlerta):Observable<ConfigAlerta>{
    return this.http.post<ConfigAlerta>(API_ENDPOINTS.ALERTAS, dadosAlerta, {headers: this.adicionaHeader()});
  }

  atualizarAlerta(dadosAlerta:ConfigAlerta):Observable<ConfigAlerta>{
    return this.http.put<ConfigAlerta>(API_ENDPOINTS.ALERTAS, dadosAlerta, {headers: this.adicionaHeader()});
  }

  selecionarTodosAlertas():Observable<ConfigAlerta[]>{
    return this.http.get<ConfigAlerta[]>(API_ENDPOINTS.ALERTAS, {headers: this.adicionaHeader()});
  }

  selecionarAlerta(id: number):Observable<ConfigAlerta>{
    return this.http.get<ConfigAlerta>(API_ENDPOINTS.ALERTAS + '/' + id);
  }


}
