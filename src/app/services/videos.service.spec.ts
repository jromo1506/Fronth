import { TestBed } from '@angular/core/testing';

import { VideosService } from './videos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // agrega lo que necesite tu componente, ej:
            snapshot: { params: {}, queryParams: {} },
            params: of({}),          // importa 'of' desde 'rxjs' si usas observables
            queryParams: of({}),
          },
        },
      ],
    });
    service = TestBed.inject(VideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
