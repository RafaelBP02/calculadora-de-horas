import { TestBed } from '@angular/core/testing';

import { ConfigAlertaService } from './config-alerta.service';

describe('ConfigAlertaService', () => {
  let service: ConfigAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
