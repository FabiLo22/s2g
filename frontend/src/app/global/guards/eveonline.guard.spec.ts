import { TestBed } from '@angular/core/testing';

import { EvEOnlineGuard } from './eveonline.guard';

describe('EvEOnlineGuard', () => {
  let guard: EvEOnlineGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EvEOnlineGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
