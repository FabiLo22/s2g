import { TestBed } from '@angular/core/testing';

import { EvEOnlineAPIService } from './eveonline-api.service';

describe('EvEOnlineAPIService', () => {
  let service: EvEOnlineAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvEOnlineAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
