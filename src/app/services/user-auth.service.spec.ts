import { TestBed } from '@angular/core/testing';

import { UserAuthService } from './user-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserAuthService', () => {
  let service: UserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
