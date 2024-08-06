import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-config-data',
  templateUrl: './notification-config-data.component.html',
  styleUrl: './notification-config-data.component.css',
})
export class NotificationConfigDataComponent {
  horariosForm = new FormGroup({
    inicioExpediente: new FormControl<string | null>(null, Validators.required),
    inicioIntervalo: new FormControl<string | null>(null, Validators.required),
    fimIntervalo: new FormControl<string | null>(null, Validators.required),
    fimExpediente: new FormControl<string | null>(null, Validators.required),
  });

  enviaDadosSalvos(): void {
    if (this.horariosForm.valid) {
      console.log(this.horariosForm.get('inicioExpediente')?.value);
      console.log(this.horariosForm.get('inicioIntervalo')?.value);
      console.log(this.horariosForm.get('fimIntervalo')?.value);
      console.log(this.horariosForm.get('fimExpediente')?.value);
    } else {
      this.horariosForm.markAllAsTouched();
    }

    //TODO: refatorar este metodo para asyncrono e fazer a comunicação com o back para salvar no back
  }
}
