import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DuracaoTrabalho } from '../calculadora/calculadora.component';
@Component({
  selector: 'app-notification-config-data',
  templateUrl: './notification-config-data.component.html',
  styleUrl: './notification-config-data.component.css',
})
export class NotificationConfigDataComponent implements OnInit {
  cargasHorarias: DuracaoTrabalho[] = [];

  horariosForm = new FormGroup({
    cargaHorariaSelecionada: new FormControl<DuracaoTrabalho | null>(null, Validators.required),
    inicioExpediente: new FormControl<string>('', Validators.required),
    inicioIntervalo: new FormControl<string>('', Validators.required),
    fimIntervalo: new FormControl<string>('', Validators.required),
    fimExpediente: new FormControl<string>('', Validators.required),
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cargasHorarias = [
      { nome: '8 horas', valor: 8},
      { nome: '6 horas', valor: 6},
      { nome: '4 horas', valor: 4},
    ];
  }

  // Configuração do componente ConfirmDialog do primeNG <https://primeng.org/confirmdialog>
  confirmarDados(event: Event) {
    if (this.confirmaDadosSalvos()) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Tem certeza de que quer salvar esses dados?<br>
          Sua carga horária: ${this.horariosForm.get('cargaHorariaSelecionada')?.value?.nome}<br>
          Início do Expediente: ${this.horariosForm.get('inicioExpediente')?.value}<br>
          Início do Intervalo: ${this.horariosForm.get('inicioIntervalo')?.value}<br>
          Fim do Intervalo: ${this.horariosForm.get('fimIntervalo')?.value}<br>
          Fim do Expediente: ${this.horariosForm.get('fimExpediente')?.value}`,
        header: 'Revise seus horaios',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'confirmar',
        acceptIcon: 'none',
        rejectLabel: 'cancelar',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          //Toast para operacao confirmada
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Configurações salvas com sucesso',
          });
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

  private enviaDados(): void {
    console.log(this.horariosForm.get('cargaHorariaSelecionada')?.value);
    console.log(this.horariosForm.get('inicioExpediente')?.value);
    console.log(this.horariosForm.get('inicioIntervalo')?.value);
    console.log(this.horariosForm.get('fimIntervalo')?.value);
    console.log(this.horariosForm.get('fimExpediente')?.value);
    //TODO: refatorar este metodo para asyncrono e fazer a comunicação com o back para salvar no back

  }
}
