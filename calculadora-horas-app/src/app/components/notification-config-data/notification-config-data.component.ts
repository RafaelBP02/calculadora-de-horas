import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DuracaoTrabalho } from '../calculadora/calculadora.component';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { ConfigAlerta } from '../../models/ConfigAlerta';
@Component({
  selector: 'app-notification-config-data',
  templateUrl: './notification-config-data.component.html',
  styleUrl: './notification-config-data.component.css',
})
export class NotificationConfigDataComponent implements OnInit {
  cargasHorarias: DuracaoTrabalho[] = [];
  alertas: ConfigAlerta[] = [];
  reqAlertaConfigurado: ConfigAlerta = new ConfigAlerta();
  reqAlertaExiste: boolean = false;

  horariosForm = new FormGroup({
    cargaHorariaSelecionada: new FormControl<DuracaoTrabalho | null>(null,Validators.required),
    inicioExpediente: new FormControl<string>('', Validators.required),
    inicioIntervalo: new FormControl<string>('', Validators.required),
    fimIntervalo: new FormControl<string>('', Validators.required),
    fimExpediente: new FormControl<string>('', Validators.required),
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private confAlertaService: ConfigAlertaService,
    private autorizacaoService: AutorizacaoService
  ) {
    this.cargasHorarias = [
      { nome: '8 horas', valor: 8 },
      { nome: '6 horas', valor: 6 },
      { nome: '4 horas', valor: 4 },
    ];
  }

  ngOnInit() {
    this.selecionarAlertaConfigurado();
    console.log(this.reqAlertaExiste);
  }

  // Configuração do componente ConfirmDialog do primeNG <https://primeng.org/confirmdialog>
  confirmarDados(event: Event) {
    if (this.confirmaDadosSalvos()) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Tem certeza de que quer salvar esses dados?<br>
          Sua carga horária: ${
            this.horariosForm.get('cargaHorariaSelecionada')?.value?.nome
          }<br>
          Início do Expediente: ${
            this.horariosForm.get('inicioExpediente')?.value
          }<br>
          Início do Intervalo: ${
            this.horariosForm.get('inicioIntervalo')?.value
          }<br>
          Fim do Intervalo: ${this.horariosForm.get('fimIntervalo')?.value}<br>
          Fim do Expediente: ${this.horariosForm.get('fimExpediente')?.value}`,
        header: 'Revise seus horários',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'confirmar',
        acceptIcon: 'none',
        rejectLabel: 'cancelar',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this.enviaDados();
        },
        reject: () => {
          //Toast para operacao cancelada
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'A Operação foi cancelada',
            life: 3000,
          });
        },
      });
    }
  }

  confirmaDadosSalvos(): boolean {
    if (this.horariosForm.valid) {
      return true;
    } else {
      this.horariosForm.markAllAsTouched();
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS');
      return false;
    }
  }

  get horariosFormControl() {
    return this.horariosForm.controls;
  }

  enviaDados(): void {
    if (this.reqAlertaExiste) {
      //Faz requezicao PUT para atulizar as configs de alerta
      console.log('FAZ REQUISICAO');
      this.atualizarAlertaConfigurado();
    } else {
      //Faz requezicao POST para publicar nova config de alerta
      this.criarNovoAlerta();
    }
  }

  selecionarAlertaConfigurado(): void {
    this.confAlertaService.selecionarAlertaV2().subscribe({
      next: (dados) => {
        // Atualize os dados com a resposta da API
        this.reqAlertaConfigurado = dados;

        this.horariosForm.patchValue({
          cargaHorariaSelecionada: this.cargasHorarias.find(
            (ch) => ch.valor === this.reqAlertaConfigurado.workload
          ),
          inicioExpediente: this.reqAlertaConfigurado.workEntry,
          inicioIntervalo: this.reqAlertaConfigurado.intervalBeginning,
          fimIntervalo: this.reqAlertaConfigurado.intervalEnd,
          fimExpediente: this.reqAlertaConfigurado.workEnd,
        });
        this.reqAlertaConfigurado.id = dados.id;
        this.reqAlertaConfigurado.userId = dados.userId;

        this.reqAlertaExiste = true;
      },
      error: (error: any) => {
        // A API ira retornar um erro caso seja pesquisado um id que nao existe
        this.messageService.add({
          severity: 'info',
          summary: 'Nota:',
          detail: 'Por favor, configure o seu alerta de horario',
        });
        console.error('Erro ao atualizar dados:', error);
        this.reqAlertaExiste = false;
      },
      complete: () => {
        console.log('Requisição concluída.');
      },
    });
  }

  private atualizarAlertaConfigurado(): void {
    console.log('id usuario: '+ this.autorizacaoService.decodedUserId);
    this.confAlertaService
      .atualizarAlerta(
        ConfigAlerta.converteFormulario(
          this.horariosForm,
          this.autorizacaoService.decodedUserId
        )
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Configurações atualizadas com sucesso',
          });

          this.selecionarAlertaConfigurado();
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Motivo:' + error.message,
            life: 3000,
          });
        },
      });
  }

  private criarNovoAlerta(): void {
    this.confAlertaService
      .adicionarAlerta(
        ConfigAlerta.converteFormulario(
          this.horariosForm,
          this.autorizacaoService.decodedUserId
        )
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Configurações salvas com sucesso',
          });

          this.selecionarAlertaConfigurado();
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Motivo:' + error.message,
            life: 3000,
          });
        },
      });
  }
}
