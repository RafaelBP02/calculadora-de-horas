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
    console.log(this.calcFormData);
    this.calcFormData = new Calculadora();
  }
}
