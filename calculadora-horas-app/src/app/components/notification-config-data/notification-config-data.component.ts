import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notification-config-data',
  templateUrl: './notification-config-data.component.html',
  styleUrl: './notification-config-data.component.css'
})
export class NotificationConfigDataComponent implements OnInit {
  formGroup: FormGroup | undefined;

  ngOnInit() {
      this.formGroup = new FormGroup({
          inicioExpediente: new FormControl<string | null>(null)
      });
  }
}
