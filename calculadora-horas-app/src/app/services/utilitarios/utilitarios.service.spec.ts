import { TestBed } from '@angular/core/testing';

import { UtilitariosService } from './utilitarios.service';
import { Component } from '@angular/core';

describe('UtilitariosService', () => {
  let service: UtilitariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('dever retornar string vazia', () => {
    expect(UtilitariosService.formatTime(null)).toEqual('');
  });
});
