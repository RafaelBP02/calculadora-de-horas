import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilitariosService {
  static idToken: string = 'token';

  constructor() { }

  static converteStringParaDate(tempo: string): Date {
    const [horas, minutos] = tempo.split(':').map(Number);
    const date = new Date();
    date.setHours(horas, minutos, 0, 0);
    return date;
  }

  static formatTime(value: any): string {
    const locale:string = 'pt-BR';

    if (!value) return '';
    return formatDate(UtilitariosService.converteStringParaDate(value), 'HH:mm:ss', locale);
  }


  static setToken(token: string): void {
    sessionStorage.setItem(this.idToken, token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem(this.idToken);
  }

  static removeToken(): void {
    sessionStorage.removeItem(this.idToken);
  }
}
