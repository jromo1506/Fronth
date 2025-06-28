import { TestBed } from '@angular/core/testing';

import { GolbalApiService } from './golbal-api.service';

describe('GolbalApiService', () => {
  let service: GolbalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolbalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
