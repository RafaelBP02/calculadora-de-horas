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

    static converteFormulario(formulario:FormGroup, id:number, user_id:number):ConfigAlerta{

      const dadosConvertidos  = new ConfigAlerta();

      dadosConvertidos.id = id;
      dadosConvertidos.workEntry = UtilitariosService.formatTime(formulario.get('inicioExpediente')?.value || '');
      dadosConvertidos.intervalBeginning = UtilitariosService.formatTime(formulario.get('inicioIntervalo')?.value || '');
      dadosConvertidos.intervalEnd = UtilitariosService.formatTime(formulario.get('fimIntervalo')?.value || '');
      dadosConvertidos.workEnd = UtilitariosService.formatTime(formulario.get('fimExpediente')?.value || '');
      dadosConvertidos.workload = formulario.get('cargaHorariaSelecionada')?.value?.valor || 0;
      dadosConvertidos.user_id = user_id;

      return dadosConvertidos;
    }


}
