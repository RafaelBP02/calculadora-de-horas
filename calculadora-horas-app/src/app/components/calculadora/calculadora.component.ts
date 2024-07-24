import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Calculadora } from '../../models/Calculadora';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  timeRegex: string = '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';

  visible: boolean = false;
  calcFormData = new Calculadora();

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // O código aqui dentro só será executado no navegador
      this.visible = true;
      // this.initializeDialog();
    }
  }

  displayDialog(open:boolean):void{
    this.visible = open;
  }

  calcularHoraio(): void {
    // Calculo realizado para uma carga horária de oito horas diarias
    let cargaHorariaRestante: Date = new Date();
    let entradaT: Date = this.timeStringToDate(this.calcFormData.entrada);
    let inicioT: Date = this.timeStringToDate(
      this.calcFormData.inicioIntervalo
    );
    let fimT: Date = this.timeStringToDate(this.calcFormData.fimIntervalo);

    console.log(entradaT.getHours(), inicioT.getHours(), fimT.getHours());

    cargaHorariaRestante.setMinutes(
      0 - Math.abs(entradaT.getMinutes() - inicioT.getMinutes())
    );

    cargaHorariaRestante.setHours(
      8 - Math.abs(entradaT.getHours() - inicioT.getHours())
    );

    console.log('Carga horaria restante: ' + cargaHorariaRestante);

    fimT.setHours(fimT.getHours() + cargaHorariaRestante.getHours());
    fimT.setMinutes(fimT.getMinutes() + cargaHorariaRestante.getMinutes());
    // let resultadoT:Date = new Date();
    console.log('Horario de saida: ' + fimT);

    this.calcFormData = new Calculadora();
  }

  cancelarOperacao(): void {
    this.calcFormData = new Calculadora();
  }

  private timeStringToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
