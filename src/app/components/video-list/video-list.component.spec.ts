import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoListComponent } from './video-list.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let fixture: ComponentFixture<VideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoListComponent,HttpClientTestingModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(VideoListComponent);
    component = fixture.componentInstance;

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

    fixture.detectChanges();
  });

  it('debe renderizar al menos un video', () => {
    const videoItems = fixture.debugElement.queryAll(By.css('.video-container'));
    expect(videoItems.length).toBeGreaterThan(0);
  });
});
