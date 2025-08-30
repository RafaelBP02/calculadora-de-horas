import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc-result-dialog',
  templateUrl: './calc-result-dialog.component.html',
  styleUrl: './calc-result-dialog.component.css'
})
export class CalcResultDialogComponent{
  @Input() horaFinal: Date | undefined;
  @Input() horaExcedida: boolean | undefined;
}
