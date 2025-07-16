import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { VideoListComponent } from './video-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { VideosService } from '../../services/videos.service';
import Swal from 'sweetalert2';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';

describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let fixture: ComponentFixture<VideoListComponent>;
  let videosServiceSpy: jasmine.SpyObj<VideosService>;
  let errorSpy: jasmine.Spy;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VideosService', ['likeVideo']);
    errorSpy = spyOn(console, 'error');

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,VideoListComponent],
      declarations: [],
      providers: [
        { provide: VideosService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoListComponent);
    component = fixture.componentInstance;
    videosServiceSpy = TestBed.inject(VideosService) as jasmine.SpyObj<VideosService>;

    component.videosYT = [
      {
        id: { videoId: 'abc123' },
        snippet: {
          title: 'Video de prueba',
          channelTitle: 'Canal Test',
          thumbnails: {
            medium: { url: 'https://example.com/thumb.jpg' }
          }
        },
        isStarred: false
      }
    ];

    component.credentials = { userId: 'testUser' } as any;

    fixture.detectChanges();
  });

  it('debe renderizar al menos un video', () => {
    const videoItems = fixture.debugElement.queryAll(By.css('.video-container'));
    expect(videoItems.length).toBeGreaterThan(0);
  });

  
describe('ngOnChanges', () => {
  it('debería detectar cambio en videosYT y registrar en consola', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      videos: new SimpleChange(null, ['nuevo video'], true)
    });

    expect(console.log).toHaveBeenCalledWith('Videos changed:', ['nuevo video']);
  });

  it('no debe hacer nada si no cambia videos', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      otroCambio: new SimpleChange(null, [], true)
    });

    expect(console.log).not.toHaveBeenCalled();
  });
});

describe('toggleStar', () => {
  beforeEach(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    spyOn(console, 'log');
    spyOn(console, 'error');
  });

  it('debe mostrar alerta si no hay credenciales', async () => {
    component.credentials = null;
    component.toggleStar('video123');

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Create an account',
      text: 'You need an account to like videos',
      icon: 'warning'
    }));
  });

  it('debe llamar al servicio y mostrar éxito si hay credenciales', fakeAsync(() => {
    videosServiceSpy.likeVideo.and.returnValue(of({ msg: 'ok' }));

    component.toggleStar('video123');

    expect(videosServiceSpy.likeVideo).toHaveBeenCalledWith({
      id_usuario: 'testUser',
      id_video: 'video123'
    });

    tick(); // avanza el observable

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Yahoo!',
      text: 'You like this video',
      icon: 'success'
    }));
  }));

    it('debe manejar error si falla likeVideo', fakeAsync(() => {
  errorSpy.calls.reset(); // Limpia llamadas previas por seguridad

  videosServiceSpy.likeVideo.and.returnValue(throwError(() => ({ error: 'error' })));

  component.toggleStar('video123');
  tick();

  expect(errorSpy).toHaveBeenCalledWith('Error liking video:', { error: 'error' });
}));
});

  
});
