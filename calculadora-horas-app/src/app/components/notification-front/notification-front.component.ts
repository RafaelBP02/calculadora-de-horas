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
  private intervalID: Subscription = new Subscription();
  private userId: number;

  configuracoesSalvas: ConfigAlerta = new ConfigAlerta();
  botaoVisivel: boolean = false

  constructor(private alertAPI: ConfigAlertaService, private messageService:MessageService) {
    this.userId = 2;
  }

  ngOnInit(): void {
    this.alertAPI.selecionarAlerta(this.userId).subscribe({
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
    this.intervalID = timer(0, 60000).subscribe(() => {
      this.verificarAlertas();
      console.log('-----------------------------');
    });
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
    return diffMins <= minutos;
  }
}
