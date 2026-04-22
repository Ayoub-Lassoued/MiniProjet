import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { telephoneGuard } from './telephone-guard';

describe('telephoneGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => telephoneGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
