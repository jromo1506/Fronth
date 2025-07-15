import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideosService } from '../../services/videos.service';
import { UserService } from '../../services/user.service';
import { YoutubeService } from '../../services/youtube.service';
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const mockCredentials = { userId: '123', username: 'testuser' };
  const likedVideosMock = [{ id_video: 'abc' }, { id_video: 'def' }];

  const videoInfoResponse = (id: string) => ({
    items: [{
      id,
      snippet: { title: `Video ${id}` },
      statistics: { viewCount: 1000 }
    }]
  });

  const mockUserAuthService = {
    credentials$: of(mockCredentials)
  };

  const mockVideosService = {
    getLikedVideos: jasmine.createSpy('getLikedVideos')
      .and.returnValue(of(likedVideosMock))
  };

  const mockYoutubeService = {
    getVideoInfo: jasmine.createSpy('getVideoInfo')
      .and.callFake((id: string) => of(videoInfoResponse(id)))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, VideoListComponent],
      providers: [
        provideNoopAnimations(),
        { provide: VideosService, useValue: mockVideosService },
        { provide: UserService, useValue: mockUserAuthService },
        { provide: YoutubeService, useValue: mockYoutubeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar las credenciales y marcar como logueado', () => {
    expect(component.credentials).toEqual(mockCredentials);
    expect(component.isLogged).toBeTrue();
  });

  it('debería llamar getLikedVideos y luego findVideos al inicializar', () => {
    spyOn(component, 'findVideos').and.callThrough();

    component.ngOnInit();

    expect(mockVideosService.getLikedVideos).toHaveBeenCalledWith(mockCredentials.userId);
    expect(component.findVideos).toHaveBeenCalledWith(likedVideosMock);
  });

  it('debería llenar foundVideos con los datos transformados', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      expect(component.foundVideos.length).toBe(2);
      expect(component.foundVideos[0]).toEqual(jasmine.objectContaining({
        id: 'abc',
        snippet: jasmine.any(Object),
        statistics: jasmine.any(Object),
        isStarred: false
      }));
      expect(component.loading).toBeTrue(); // coincide porque es el último en completarse
      done();
    }, 100);
  });

  it('debería alternar isStarred con toggleStar', () => {
    component.foundVideos = [
      { id: 'abc', isStarred: false },
      { id: 'def', isStarred: true }
    ];

    component.toggleStar('abc');
    expect(component.foundVideos[0].isStarred).toBeTrue();

    component.toggleStar('def');
    expect(component.foundVideos[1].isStarred).toBeFalse();
  });
});
