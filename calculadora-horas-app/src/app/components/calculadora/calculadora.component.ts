import { Component} from '@angular/core';
import { Calculadora } from '../../models/Calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent{
  constructor() {}

  visible: boolean = false;
  horarioSaida: Date = new Date;
  calcFormData = new Calculadora();

  displayDialog():void{
    this.visible = true;
  }

  calcularHoraio(): void {
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante:Date = new Date();
    let horaEntrada:Date = this.converteStringParaDate(this.calcFormData.entrada);
    let inicioIntervalo:Date = this.converteStringParaDate(this.calcFormData.inicioIntervalo);
    let fimIntervalo:Date = this.converteStringParaDate(this.calcFormData.fimIntervalo);

    cargaHorariaRestante.setHours(8);
    cargaHorariaRestante.setMinutes(0);
    cargaHorariaRestante.setSeconds(0);

    cargaHorariaRestante.setMinutes( Math.abs(horaEntrada.getMinutes()-inicioIntervalo.getMinutes()));
    cargaHorariaRestante.setHours(cargaHorariaRestante.getHours() - Math.abs(horaEntrada.getHours()-inicioIntervalo.getHours()));

    fimIntervalo.setHours(fimIntervalo.getHours()+cargaHorariaRestante.getHours());
    fimIntervalo.setMinutes(fimIntervalo.getMinutes()+cargaHorariaRestante.getMinutes());

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
