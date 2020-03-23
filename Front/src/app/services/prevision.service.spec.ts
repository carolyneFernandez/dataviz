import { TestBed } from '@angular/core/testing';

import { PrevisionService } from './prevision.service';

describe('PrevisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrevisionService = TestBed.get(PrevisionService);
    expect(service).toBeTruthy();
  });
});
