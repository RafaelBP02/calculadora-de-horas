import { MessageService } from 'primeng/api';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { ConfigAlerta } from '../../models/ConfigAlerta';
import { UtilitariosService } from '../../services/utilitarios/utilitarios.service';

@Component({
  selector: 'app-notification-front',
  templateUrl: './notification-front.component.html',
  styleUrl: './notification-front.component.css',
})
export class NotificationFrontComponent implements OnInit, OnDestroy {
  private userId: number;
  intervalID: any;

  configuracoesSalvas: ConfigAlerta = new ConfigAlerta();

  constructor(private alertAPI: ConfigAlertaService, private messageService:MessageService, private ngZone:NgZone) {
    this.userId = 2;
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.alertAPI.selecionarAlerta(this.userId).subscribe({
        next: (alertas) => {
          this.ngZone.run(() => {
            this.configuracoesSalvas = alertas;
            // this.verificarAlertas();//esta dando timeout
          });
        },
        error: (erro) => {
          console.log('ERRO: ' + erro.message);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if(this.intervalID){
      clearInterval(this.intervalID);
    }
  }

  private verificarAlertas(): void {
    const agora:Date = new Date()

    this.intervalID = setInterval(() => {
      if(this.calculaDiferencaMinutos(
        UtilitariosService.converteStringParaDate(this.configuracoesSalvas.workEntry), agora, 2)){
          this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE ENTRADA NO TRABALHO!")
      }
      else if(this.calculaDiferencaMinutos(
        UtilitariosService.converteStringParaDate(this.configuracoesSalvas.intervalBeginning), agora, 2)){
          this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE INICIO DO INTERVALO!")
      }
      if(this.calculaDiferencaMinutos(
        UtilitariosService.converteStringParaDate(this.configuracoesSalvas.intervalEnd), agora, 2)){
          this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE FIM DO INTERVALO!")
      }
      if(this.calculaDiferencaMinutos(
        UtilitariosService.converteStringParaDate(this.configuracoesSalvas.workEnd), agora, 2)){
          this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE SAÍDA NO TRABALHO!")
        }
    }, 60000); // verifica a cada minuto
  }

  private showToastMessage(mensagem: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Nota:',
      detail: mensagem,
    });
  }

  private calculaDiferencaMinutos(horario1: Date, horario2: Date, minutos: number): boolean{
    //TODO logica para determinar se o intervalo de minutos é verdadeiro
    return true;
  }
}
