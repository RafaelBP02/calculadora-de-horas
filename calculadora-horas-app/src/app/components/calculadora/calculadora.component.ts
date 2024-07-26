import { Component } from '@angular/core';
import { Calculadora } from '../../models/Calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  calcFormData = new Calculadora()

  calcularHoraio():void{
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante:Date = new Date();
    let horaEntrada:Date = this.converteStringParaDate(this.calcFormData.entrada);
    let inicioIntervalo:Date = this.converteStringParaDate(this.calcFormData.inicioIntervalo);
    let fimIntervalo:Date = this.converteStringParaDate(this.calcFormData.fimIntervalo);

    console.log(horaEntrada.getHours() + ':' + horaEntrada.getMinutes(), inicioIntervalo.getHours() + ':' + inicioIntervalo.getMinutes(), fimIntervalo.getHours());

    cargaHorariaRestante.setHours(8);
    cargaHorariaRestante.setMinutes(0);
    cargaHorariaRestante.setSeconds(0);

    cargaHorariaRestante.setMinutes( Math.abs(horaEntrada.getMinutes()-inicioIntervalo.getMinutes()));
    cargaHorariaRestante.setHours(cargaHorariaRestante.getHours() - Math.abs(horaEntrada.getHours()-inicioIntervalo.getHours()));


    console.log('Carga horaria restante: ' + cargaHorariaRestante);

    fimIntervalo.setHours(fimIntervalo.getHours()+cargaHorariaRestante.getHours());
    fimIntervalo.setMinutes(fimIntervalo.getMinutes()+cargaHorariaRestante.getMinutes());

    console.log('Horario de saida: ' + fimIntervalo);
  }

  cancelarOperacao():void{
    this.calcFormData = new Calculadora();
  }

  private converteStringParaDate(tempo: string): Date {
    const [horas, minutos] = tempo.split(':').map(Number);
    const date = new Date();
    date.setHours(horas, minutos, 0, 0);
    return date;
  }
}
