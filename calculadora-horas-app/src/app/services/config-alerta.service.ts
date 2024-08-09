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

  selecionar():Observable<ConfigAlerta[]>{
    return this.http.get<ConfigAlerta[]>(API_ENDPOINTS.BACKEND_URL);
  }
}
