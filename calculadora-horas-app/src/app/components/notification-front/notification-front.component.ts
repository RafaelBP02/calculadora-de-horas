import { MessageService } from 'primeng/api';
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { ConfigAlerta } from '../../models/ConfigAlerta';
import { UtilitariosService } from '../../services/utilitarios/utilitarios.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification-front',
  templateUrl: './notification-front.component.html',
  styleUrl: './notification-front.component.css',
})
export class NotificationFrontComponent implements OnInit, OnDestroy {
  private alertId: number;

  intervalID: Subscription = new Subscription();
  configuracoesSalvas: ConfigAlerta = new ConfigAlerta();
  botaoVisivel: boolean = false;
  LigaDesliga: boolean = false;

  constructor(
    private alertAPI: ConfigAlertaService,
     private messageService:MessageService
    ) {
    this.alertId = 2;
  }

  ngOnInit(): void {
    this.alertAPI.selecionarAlerta(this.alertId).subscribe({
      next: (alertas) => {
        this.configuracoesSalvas = alertas;
        this.botaoVisivel = true
        console.log(this.configuracoesSalvas)

      },
      error: (erro) => {
        console.log('ERRO: ' + erro.message);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.intervalID) {
      this.intervalID.unsubscribe();
    }
  }

  tarefaRelogio(): void {
    if(this.LigaDesliga){
      this.intervalID = timer(0, 60000).subscribe(() => {
        this.verificarAlertas();
        console.log('-----------------------------');
      });
    }
    else{
      if (this.intervalID) {
        console.log('alertas desligados')
        this.intervalID.unsubscribe();
      }
    }

  }

  private verificarAlertas(): void {
    const agora:Date = new Date()

    if(this.calculaDiferencaMinutos(
      UtilitariosService.converteStringParaDate(this.configuracoesSalvas.workEntry), agora, 2)){
        this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE ENTRADA NO TRABALHO!")
    }
    else if(this.calculaDiferencaMinutos(
      UtilitariosService.converteStringParaDate(this.configuracoesSalvas.intervalBeginning), agora, 2)){
        this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE INICIO DO INTERVALO!")
    }
    else if(this.calculaDiferencaMinutos(
      UtilitariosService.converteStringParaDate(this.configuracoesSalvas.intervalEnd), agora, 2)){
        this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE FIM DO INTERVALO!")
    }
    else if(this.calculaDiferencaMinutos(
      UtilitariosService.converteStringParaDate(this.configuracoesSalvas.workEnd), agora, 2)){
        this.showToastMessage("ATENÇÃO! ESTÁ NA HORA DE BATER O PONTO DE SAÍDA NO TRABALHO!")
      }
  }

  private showToastMessage(mensagem: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Nota:',
      detail: mensagem,
    });
  }

  private calculaDiferencaMinutos(horario1: Date, horario2: Date, minutos: number): boolean{
    const diffMs = Math.abs(horario1.getTime() - horario2.getTime());
    const diffMins = Math.ceil(diffMs / (1000 * 60));
    console.log('diferenca = ' + diffMins + ' minutos');
    return diffMins > 0 && diffMins <= minutos;
  }
}
