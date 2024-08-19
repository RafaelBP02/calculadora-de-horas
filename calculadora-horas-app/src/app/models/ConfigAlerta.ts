import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilitariosService } from '../services/utilitarios/utilitarios.service';
export class ConfigAlerta{
    id:number = 0;
    workEntry:string = '';
    intervalBeginning:string = '';
    intervalEnd:string = '';
    workEnd:string = '';
    workload:number = 0;
    user_id:number = 0;

    static formatTime(value: any): string {
      const locale:string = 'pt-BR';

      if (!value) return '';
      return formatDate(UtilitariosService.converteStringParaDate(value), 'HH:mm:ss', locale);
    }

    static converteFormulario(formulario:FormGroup, id:number, user_id:number):ConfigAlerta{

      const dadosConvertidos  = new ConfigAlerta();

      dadosConvertidos.id = id;
      dadosConvertidos.workEntry = this.formatTime(formulario.get('inicioExpediente')?.value || '');
      dadosConvertidos.intervalBeginning = this.formatTime(formulario.get('inicioIntervalo')?.value || '');
      dadosConvertidos.intervalEnd = this.formatTime(formulario.get('fimIntervalo')?.value || '');
      dadosConvertidos.workEnd = this.formatTime(formulario.get('fimExpediente')?.value || '');
      dadosConvertidos.workload = formulario.get('cargaHorariaSelecionada')?.value?.valor || 0;
      dadosConvertidos.user_id = user_id;

      return dadosConvertidos;
    }


}
