import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { YoutubeService } from '../../services/youtube.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let youtubeServiceSpy: jasmine.SpyObj<YoutubeService>;

  beforeEach(async () => {
    const routeMock = {
      queryParams: of({ query: 'angular tutorial' })
    };

    youtubeServiceSpy = jasmine.createSpyObj('YoutubeService', ['searchVideos']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SearchComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: YoutubeService, useValue: youtubeServiceSpy },
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería leer query param y llamar a searchVideos', () => {
        const mockVideos = [
      {
        id: { videoId: '1' },
        snippet: {
          title: 'Mock Video',
          description: 'Description',
          channelTitle: 'Mock Channel',
          thumbnails: {
            medium: {
              url: 'https://example.com/thumb.jpg'
            }
          }
        },
        isStarred: false
      }
    ];
    youtubeServiceSpy.searchVideos.and.returnValue(of(mockVideos));

    fixture.detectChanges(); // Ejecuta ngOnInit

    expect(component.searchQuery).toBe('angular tutorial');
    expect(youtubeServiceSpy.searchVideos).toHaveBeenCalledWith('angular tutorial', 5);
    expect(component.videos).toEqual(mockVideos);
  });

  it('debería manejar errores al buscar videos', () => {
    const error = new Error('API error');
    youtubeServiceSpy.searchVideos.and.returnValue(throwError(() => error));
    spyOn(console, 'error');

    fixture.detectChanges(); // Ejecuta ngOnInit

    expect(youtubeServiceSpy.searchVideos).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching videos', error);
  });
});