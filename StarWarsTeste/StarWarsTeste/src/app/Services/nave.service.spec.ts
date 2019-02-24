import { TestBed } from '@angular/core/testing';

import { NaveService } from './nave.service';

describe('NaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaveService = TestBed.get(NaveService);
    expect(service).toBeTruthy();
  });
});
