import { TestBed } from '@angular/core/testing';

import { ConfigAlertaService } from './config-alerta.service';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ConfigAlertaService', () => {
  let service: ConfigAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        ConfirmationService,
        MessageService,
        ConfigAlertaService,
        HttpClient
      ],

    });
    service = TestBed.inject(ConfigAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
