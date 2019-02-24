import { TestBed } from '@angular/core/testing';

import { EspecieService } from './especie.service';

describe('EspecieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspecieService = TestBed.get(EspecieService);
    expect(service).toBeTruthy();
  });
});
