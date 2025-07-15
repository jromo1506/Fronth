import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent,HttpClientTestingModule,BrowserAnimationsModule],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
