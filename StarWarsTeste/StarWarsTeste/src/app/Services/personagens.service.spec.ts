import { TestBed } from '@angular/core/testing';

import { PersonagensService } from './personagens.service';

describe('PersonagensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonagensService = TestBed.get(PersonagensService);
    expect(service).toBeTruthy();
  });
});
