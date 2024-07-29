import { Component, OnInit } from '@angular/core';
import { Calculadora } from '../../models/Calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent implements OnInit{
  constructor() {}

  visible: boolean = false;
  horarioSaida: Date = new Date();
  calcFormData = new Calculadora();

  cargaSelecionada: number = 8;

  cargasHorarias: any[] = [
    { name: '8 horas', value: 8, key: 'O' },
    { name: '6 horas', value: 6, key: 'S' },
    { name: '4 horas', value: 4, key: 'Q' },
  ];

  ngOnInit() {
    // inicia a aplicação com 8 horas marcado por padrao
    this.cargaSelecionada = this.cargasHorarias[0];
  }

  displayDialog(): void {
    this.visible = true;
  }

  calcularHoraio(): void {
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante: Date = new Date();
    let horaEntrada: Date = this.converteStringParaDate(
      this.calcFormData.entrada
    );
    let inicioIntervalo: Date = this.converteStringParaDate(
      this.calcFormData.inicioIntervalo
    );
    let fimIntervalo: Date = this.converteStringParaDate(
      this.calcFormData.fimIntervalo
    );

    cargaHorariaRestante.setHours(this.cargaSelecionada);
    cargaHorariaRestante.setMinutes(0);
    cargaHorariaRestante.setSeconds(0);

    cargaHorariaRestante.setMinutes(
      Math.abs(horaEntrada.getMinutes() - inicioIntervalo.getMinutes())
    );
    cargaHorariaRestante.setHours(
      cargaHorariaRestante.getHours() -
        Math.abs(horaEntrada.getHours() - inicioIntervalo.getHours())
    );

    fimIntervalo.setHours(
      fimIntervalo.getHours() + cargaHorariaRestante.getHours()
    );
    fimIntervalo.setMinutes(
      fimIntervalo.getMinutes() + cargaHorariaRestante.getMinutes()
    );

    this.horarioSaida = fimIntervalo;

    this.displayDialog();
  }

  cancelarOperacao(): void {
    this.calcFormData = new Calculadora();
  }

  private converteStringParaDate(tempo: string): Date {
    const [horas, minutos] = tempo.split(':').map(Number);
    const date = new Date();
    date.setHours(horas, minutos, 0, 0);
    return date;
  }
}
