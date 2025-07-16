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
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://fakeurl.com/thumbnail.jpg'
        }
      },
      title: 'Test Video'
    },
    id: 'ID_DEL_VIDEO'
  };

  const mockRandomVideosResponse = [
    {
      snippet: {
        thumbnails: {
          medium: { url: 'https://fakeurl.com/video1.jpg' }
        },
        title: 'Video 1'
      },
      id: 'v1'
    },
    {
      snippet: {
        thumbnails: {
          medium: { url: 'https://fakeurl.com/video2.jpg' }
        },
        title: 'Video 2'
      },
      id: 'v2'
    }
  ];

  const youtubeServiceMock = {
    getVideoInfo: jasmine.createSpy('getVideoInfo').and.returnValue(of(mockVideoInfoResponse)),
    getRandomVideos: jasmine.createSpy('getRandomVideos').and.returnValue(of(mockRandomVideosResponse)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, VideoCarrouselComponent, CommonModule],
      providers: [
        provideNoopAnimations(),
        { provide: YoutubeService, useValue: youtubeServiceMock }
      ],
      declarations: [] // vacío porque los componentes son standalone
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // ngOnInit se ejecuta y carga datos mock
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar videoInfo y videos', () => {
    expect(youtubeServiceMock.getVideoInfo).toHaveBeenCalledWith('ID_DEL_VIDEO');
    expect(youtubeServiceMock.getRandomVideos).toHaveBeenCalledWith(5);

    expect(component.videoInfo).toEqual(mockVideoInfoResponse);
    expect(component.videos).toEqual(mockRandomVideosResponse);
  });
});
