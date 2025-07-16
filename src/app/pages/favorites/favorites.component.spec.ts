import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { of, Subject } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { UserAuthService } from '../../services/user-auth.service';
import { YoutubeService } from '../../services/youtube.service';
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let videosServiceSpy: jasmine.SpyObj<VideosService>;
  let userAuthServiceMock: { credentials$: Subject<any> };
  let youtubeServiceSpy: jasmine.SpyObj<YoutubeService>;

  beforeEach(async () => {
    videosServiceSpy = jasmine.createSpyObj('VideosService', ['getLikedVideos']);
    youtubeServiceSpy = jasmine.createSpyObj('YoutubeService', ['getVideoInfo']);
    userAuthServiceMock = { credentials$: new Subject() };

    await TestBed.configureTestingModule({
      imports: [CommonModule, VideoListComponent,FavoritesComponent],
      declarations: [],
      providers: [
        { provide: VideosService, useValue: videosServiceSpy },
        { provide: YoutubeService, useValue: youtubeServiceSpy },
        { provide: UserAuthService, useValue: userAuthServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer isLogged en true y guardar credenciales cuando recibe datos', () => {
    const mockCreds = { userId: '123', username: 'test' };
    userAuthServiceMock.credentials$.next(mockCreds);
    expect(component.credentials).toEqual(mockCreds);
    expect(component.isLogged).toBeTrue();
  });

  it('debería llamar getLikedVideos y findVideos en ngOnInit si hay credenciales', fakeAsync(() => {
    const mockCreds = { userId: '123', username: 'test' };
    const mockLikes = [{ id_video: 'abc123' }];
    const mockVideoResponse = {
      items: [{
        id: 'abc123',
        snippet: { title: 'Test Video' },
        statistics: { viewCount: 1000 }
      }]
    };

    userAuthServiceMock.credentials$.next(mockCreds);
    component.credentials = mockCreds;

    videosServiceSpy.getLikedVideos.and.returnValue(of(mockLikes));
    youtubeServiceSpy.getVideoInfo.and.returnValue(of(mockVideoResponse));

    component.ngOnInit();
    tick();

    expect(videosServiceSpy.getLikedVideos).toHaveBeenCalledWith('123');
    expect(youtubeServiceSpy.getVideoInfo).toHaveBeenCalledWith('abc123');
    expect(component.foundVideos.length).toBe(1);
    expect(component.foundVideos[0].id).toBe('abc123');
    expect(component.loading).toBeTrue(); // async still resolving until tick completes all

    tick(); // simulate full async cycle
    expect(component.loading).toBeTrue(); // remains true if only 1 item
  }));

  it('debería alternar isStarred correctamente en toggleStar', () => {
    const video = { id: 'vid1', isStarred: false };
    component.foundVideos = [video];

    component.toggleStar('vid1');
    expect(video.isStarred).toBeTrue();

    component.toggleStar('vid1');
    expect(video.isStarred).toBeFalse();
  });
});
