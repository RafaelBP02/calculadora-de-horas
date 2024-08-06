import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-config-data',
  templateUrl: './notification-config-data.component.html',
  styleUrl: './notification-config-data.component.css',
})
export class NotificationConfigDataComponent {
  horariosForm = new FormGroup({
    inicioExpediente: new FormControl<string>('', Validators.required),
    inicioIntervalo: new FormControl<string>('', Validators.required),
    fimIntervalo: new FormControl<string>('', Validators.required),
    fimExpediente: new FormControl<string>('', Validators.required),
  });
  // enviado:boolean = false

  get horariosFormControl() {
    return this.horariosForm.controls;
  }



  enviaDadosSalvos(): void {
    if (this.horariosForm.valid) {
      console.log(this.horariosForm.get('inicioExpediente')?.value);
      console.log(this.horariosForm.get('inicioIntervalo')?.value);
      console.log(this.horariosForm.get('fimIntervalo')?.value);
      console.log(this.horariosForm.get('fimExpediente')?.value);
    } else {
      this.horariosForm.markAllAsTouched();
      console.log('EERO! CAMPOS DEVEM SER PREENCHIDOS')
    }
    //TODO: refatorar este metodo para asyncrono e fazer a comunicação com o back para salvar no back
  }
}
