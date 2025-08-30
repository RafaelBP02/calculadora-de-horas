import { TestBed } from '@angular/core/testing';

import { BrowserStorageService } from './browser-storage.service';
import { Component } from '@angular/core';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve apagar a memoria', () => {
    const spy = spyOn(sessionStorage, 'removeItem').and.callThrough();
    service.cleanMemory(BrowserStorageService.storageBearerId);

    expect(spy).toHaveBeenCalled();
  })
});
