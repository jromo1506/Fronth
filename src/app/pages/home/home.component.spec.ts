import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { YoutubeService } from '../../services/youtube.service';
import { of } from 'rxjs';
import { VideoCarrouselComponent } from '../../components/video-carrousel/video-carrousel.component';
import { CommonModule } from '@angular/common';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockVideoInfoResponse = {
    items: [{ id: 'ID_DEL_VIDEO', snippet: { title: 'Test Video' } }]
  };

  const mockRandomVideosResponse = {
    items: [
      { id: 'v1', snippet: { title: 'Video 1' } },
      { id: 'v2', snippet: { title: 'Video 2' } }
    ]
  };

  const youtubeServiceMock = {
    getVideoInfo: jasmine.createSpy('getVideoInfo').and.returnValue(of(mockVideoInfoResponse)),
    getRandomVideos: jasmine.createSpy('getRandomVideos').and.returnValue(of(mockRandomVideosResponse)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCarrouselComponent, CommonModule],
      providers: [
        provideNoopAnimations(),
        { provide: YoutubeService, useValue: youtubeServiceMock }
      ],
      declarations: [HomeComponent] // No es standalone, va en declarations
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar videoInfo y videos', () => {
    component.ngOnInit();

    expect(youtubeServiceMock.getVideoInfo).toHaveBeenCalledWith('ID_DEL_VIDEO');
    expect(youtubeServiceMock.getRandomVideos).toHaveBeenCalledWith(5);

    expect(component.videoInfo).toEqual(mockVideoInfoResponse.items[0]);
    expect(component.videos).toEqual(mockRandomVideosResponse.items);
  });
});
