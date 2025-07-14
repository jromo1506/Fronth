import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCarrouselComponent } from './video-carrousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VideoCarrouselComponent', () => {
  let component: VideoCarrouselComponent;
  let fixture: ComponentFixture<VideoCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCarrouselComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
