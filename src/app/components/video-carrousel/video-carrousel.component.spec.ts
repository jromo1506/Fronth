import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCarrouselComponent } from './video-carrousel.component';
import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

declare var $: any;

describe('VideoCarrouselComponent', () => {
  let component: VideoCarrouselComponent;
  let fixture: ComponentFixture<VideoCarrouselComponent>;

  // Mock básico para jQuery y owlCarousel
  beforeAll(() => {
    (window as any).$ = jasmine.createSpy('$').and.returnValue({
      owlCarousel: jasmine.createSpy('owlCarousel')
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, VideoCarrouselComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar owlCarousel en ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect($).toHaveBeenCalledWith('.owl-carousel');
    expect($.calls.mostRecent().returnValue.owlCarousel).toHaveBeenCalled();
  });

  it('debería detectar cambios en videosYT y loggear', () => {
    spyOn(console, 'log');
    const changes = {
      videosYT: new SimpleChange([], [{ id: 1 }], false)
    };

    component.videosYT = [{ id: 1 }];
    component.ngOnChanges(changes);

    expect(console.log).toHaveBeenCalledWith('Videos updated:', component.videosYT);
  });
});