import { Component, OnInit } from '@angular/core';
import { Calculadora } from '../../models/Calculadora';

export interface DuracaoTrabalho {
  nome: string;
  valor: number;
}
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent implements OnInit {
  cargasHorarias: DuracaoTrabalho[] = [];
  cargaSelecionada!: DuracaoTrabalho;

  horarioSaida: Date = new Date();
  calcFormData = new Calculadora();
  visible: boolean = false;
  horaExcedida: boolean = false;

  constructor() {}
  ngOnInit() {
    this.cargasHorarias = [
      { nome: '8 horas', valor: 8},
      { nome: '6 horas', valor: 6},
      { nome: '4 horas', valor: 4},
    ];
  }

  displayDialog(): void {
    this.visible = true;
  }

  calcularHoraio(): void {
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante: Date = new Date();
    let horaEntrada: Date = Calculadora.converteStringParaDate(
      this.calcFormData.entrada
    );
    let inicioIntervalo: Date = Calculadora.converteStringParaDate(
      this.calcFormData.inicioIntervalo
    );
    let fimIntervalo: Date = Calculadora.converteStringParaDate(
      this.calcFormData.fimIntervalo
    );

    cargaHorariaRestante.setHours(this.cargaSelecionada.valor);
    cargaHorariaRestante.setMinutes(0);
    cargaHorariaRestante.setSeconds(0);

    cargaHorariaRestante.setMinutes(
      Math.abs(horaEntrada.getMinutes() - inicioIntervalo.getMinutes())
    );
    cargaHorariaRestante.setHours(
      cargaHorariaRestante.getHours() -
        Math.abs(horaEntrada.getHours() - inicioIntervalo.getHours())
    );

    this.horaExcedida = (cargaHorariaRestante.getHours() <= 0);

    if (this.horaExcedida) {
      //Caso o usuario exceda sua hora de trabalho, não deve ser levado em consideração o tempo de fim do intervalo
      inicioIntervalo.setHours(
        inicioIntervalo.getHours() + cargaHorariaRestante.getHours()
      );
      inicioIntervalo.setMinutes(
        inicioIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
      );

      this.horarioSaida = inicioIntervalo;

    } else {
      //Caso a hora excedida permaneça false, o calculo do horario de saida segue normalmente
      fimIntervalo.setHours(
        fimIntervalo.getHours() + cargaHorariaRestante.getHours()
      );
      fimIntervalo.setMinutes(
        fimIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
      );

      this.horarioSaida = fimIntervalo;
    }

    this.displayDialog();
  }

  cancelarOperacao(): void {
    this.calcFormData = new Calculadora();
  }


}
