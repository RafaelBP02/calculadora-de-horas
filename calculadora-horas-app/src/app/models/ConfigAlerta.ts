import { FormGroup } from '@angular/forms';
export class ConfigAlerta{
    id:number = 0;
    workEntry:string = '';
    intervalBeginning:string = '';
    intervalEnd:string = '';
    workEnd:string = '';
    workload:number = 0;
    user_id:number = 0;

    static converteFormulario(formulario:FormGroup, id:number, user_id:number):ConfigAlerta{
      const dadosConvertidos  = new ConfigAlerta();

      dadosConvertidos.id = id;
      dadosConvertidos.workEntry = formulario.get('inicioExpediente')?.value || '';
      dadosConvertidos.intervalBeginning = formulario.get('inicioIntervalo')?.value || '';
      dadosConvertidos.intervalEnd = formulario.get('fimIntervalo')?.value || '';
      dadosConvertidos.workEnd = formulario.get('fimExpediente')?.value || '';
      dadosConvertidos.workload = formulario.get('cargaHorariaSelecionada')?.value?.valor || 0;
      dadosConvertidos.user_id = user_id;

      return dadosConvertidos;
    }
}
