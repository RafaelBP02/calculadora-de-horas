import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AutorizacaoService } from './autorizacao.service';
import { RouterModule } from '@angular/router';

describe('AutorizacaoService', () => {
  let service: AutorizacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(AutorizacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
