import { Component } from '@angular/core';
import { Calculadora } from '../../models/Calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  timeRegex:string = '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';

  calcFormData = new Calculadora()

  calcularHoraio():void{
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante:Date = new Date();
    let entradaT:Date = this.timeStringToDate(this.calcFormData.entrada);
    let inicioT:Date = this.timeStringToDate(this.calcFormData.inicioIntervalo);
    let fimT:Date = this.timeStringToDate(this.calcFormData.fimIntervalo);

    console.log(entradaT.getHours(), inicioT.getHours(), fimT.getHours());


    cargaHorariaRestante.setMinutes(0 - Math.abs(entradaT.getMinutes()-inicioT.getMinutes()));

    //9 = (8 horas de trabalho + 1 hora de intervalo)
    cargaHorariaRestante.setHours(9 - Math.abs(entradaT.getHours()-inicioT.getHours()));


    console.log('Carga horaria restante: ' + cargaHorariaRestante);

    fimT.setHours(fimT.getHours()+cargaHorariaRestante.getHours());
    fimT.setMinutes(fimT.getMinutes()+cargaHorariaRestante.getMinutes());
    // let resultadoT:Date = new Date();
    console.log('Horario de saida: ' + fimT);


    this.calcFormData = new Calculadora();
  }

  cancelarOperacao():void{
    this.calcFormData = new Calculadora();
  }

  private timeStringToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
