import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitariosService } from './../../services/utilitarios/utilitarios.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

export interface DuracaoTrabalho {
  nome: string;
  valor: number;
}

interface Calculadora {
  entrada: string;
  inicioIntervalo: string;
  fimIntervalo: string;
}
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent implements OnInit {
  mensagemDialogo: string = 'Horario calculado';
  cargasHorarias: DuracaoTrabalho[] = [];
  horarioCalculado: Date = new Date();

  calcFormData: FormGroup = new FormGroup({
    cargaHorariaSelecionada: new FormControl<DuracaoTrabalho | null>(null,Validators.required),
    entrada: new FormControl<string>(''),
    inicioIntervalo: new FormControl<string>('', Validators.required),
    fimIntervalo: new FormControl<string>('', Validators.required),
    saida: new FormControl<string>(''),
  });

  visible: boolean = false;
  horaExcedida: boolean = false;

  constructor() {
    this.cargasHorarias = [
      { nome: '8 horas', valor: 8 },
      { nome: '6 horas', valor: 6 },
      { nome: '4 horas', valor: 4 },
    ];

    this.inicializarControles();
  }

  ngOnInit() {}

  inicializarControles() {
    const campoEntrada = this.calcFormData.get('entrada');
    const campoSaida = this.calcFormData.get('saida');

    // Verifica qual desses 2 campos esta preenchido para desativar o outro
    campoEntrada?.valueChanges.subscribe(value => {
      if (value && campoSaida?.enabled) {
        campoSaida.disable({ emitEvent: false });
      } else if (!value && campoSaida?.disabled) {
        campoSaida.enable({ emitEvent: false });
      }
    });

    campoSaida?.valueChanges.subscribe(value => {
      if (value && campoEntrada?.enabled) {
        campoEntrada.disable({ emitEvent: false });
      } else if (!value && campoEntrada?.disabled) {
        campoEntrada.enable({ emitEvent: false });
      }
    });
  }

  displayDialog(): void {
    this.visible = true;
  }

  calcularHoraio(event: Event) {
    event.preventDefault();

    let cargaHorariaRestante: Date = new Date();
    cargaHorariaRestante.setHours(
      this.calcFormData.get('cargaHorariaSelecionada')?.value?.valor
    );
    cargaHorariaRestante.setMinutes(0);
    cargaHorariaRestante.setSeconds(0);

    let horaEntrada: Date = UtilitariosService.converteStringParaDate(
      `${this.calcFormData.get('entrada')?.value}`
    );
    let inicioIntervalo: Date = UtilitariosService.converteStringParaDate(
      `${this.calcFormData.get('inicioIntervalo')?.value}`
    );
    let fimIntervalo: Date = UtilitariosService.converteStringParaDate(
      `${this.calcFormData.get('fimIntervalo')?.value}`
    );
    let horaSaida: Date = UtilitariosService.converteStringParaDate(
      `${this.calcFormData.get('saida')?.value}`
    );

    this.calcFormData.get('entrada')?.enabled
      ? this.calculaHorarioSaida(cargaHorariaRestante, horaEntrada, inicioIntervalo, fimIntervalo)
      : this.calculaHorarioEntrada(cargaHorariaRestante ,inicioIntervalo, fimIntervalo, horaSaida);

    this.displayDialog();
  }

  limparFormulario(): void {
    this.calcFormData.reset();
    this.inicializarControles();
  }

  private calculaHorarioSaida(cargaHorariaRestante: Date, horaEntrada: Date, inicioIntervalo: Date, fimIntervalo: Date): void{
    cargaHorariaRestante.setMinutes(
      Math.abs(horaEntrada.getMinutes() - inicioIntervalo.getMinutes())
    );
    cargaHorariaRestante.setHours(
      cargaHorariaRestante.getHours() -
        Math.abs(horaEntrada.getHours() - inicioIntervalo.getHours())
    );

    this.horaExcedida = cargaHorariaRestante.getHours() <= 0;

    if (this.horaExcedida) {
      //Caso o usuario exceda sua hora de trabalho, não deve ser levado em consideração o tempo de fim do intervalo
      inicioIntervalo.setHours(
        inicioIntervalo.getHours() + cargaHorariaRestante.getHours()
      );
      inicioIntervalo.setMinutes(
        inicioIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
      );

      this.horarioCalculado = inicioIntervalo;
    } else {
      //Caso a hora excedida permaneça false, o calculo do horario de saida segue normalmente
      fimIntervalo.setHours(
        fimIntervalo.getHours() + cargaHorariaRestante.getHours()
      );
      fimIntervalo.setMinutes(
        fimIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
      );

      this.horarioCalculado = fimIntervalo;
    this.mensagemDialogo = 'Horário de Saída'

    }

  }

  private calculaHorarioEntrada(cargaHorariaRestante: Date ,inicioIntervalo: Date, fimIntervalo: Date, horaSaida: Date ): void{
    cargaHorariaRestante.setMinutes(
      Math.abs(horaSaida.getMinutes() - fimIntervalo.getMinutes())
    );
    cargaHorariaRestante.setHours(
      cargaHorariaRestante.getHours() -
        Math.abs(horaSaida.getHours() - fimIntervalo.getHours())
    );

    this.horaExcedida = cargaHorariaRestante.getHours() <= 0;

    if (this.horaExcedida) {
      //TODO:
      // COMO FICA ESSA LOGICA PARA O CASO DO HORA DE SAIDA?
      // EXISTE ESSA LOGICA?
      inicioIntervalo.setHours(
        inicioIntervalo.getHours() + cargaHorariaRestante.getHours()
      );
      inicioIntervalo.setMinutes(
        inicioIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
      );

      this.horarioCalculado = inicioIntervalo;
    } else {
      //Caso a hora excedida permaneça false, o calculo do horario de saida segue normalmente
      inicioIntervalo.setHours(
        inicioIntervalo.getHours() - cargaHorariaRestante.getHours()
      );
      inicioIntervalo.setMinutes(
        inicioIntervalo.getMinutes() - cargaHorariaRestante.getMinutes()
      );
    }

    this.horarioCalculado = inicioIntervalo;
    this.mensagemDialogo = 'Horário de Entrada'

  }
}
