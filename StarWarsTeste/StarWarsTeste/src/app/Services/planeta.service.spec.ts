import { TestBed } from '@angular/core/testing';

import { PlanetaService } from './planeta.service';

describe('PlanetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetaService = TestBed.get(PlanetaService);
    expect(service).toBeTruthy();
  });
});
