import { TestBed } from '@angular/core/testing';
import { VideosService } from './videos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GolbalApiService } from './golbal-api.service';
import { Video } from '../models/Video';

describe('VideosService', () => {
  let service: VideosService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'http://mock-api.com';
  const mockApiService = {
    getURL: () => mockApiUrl
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VideosService,
        { provide: GolbalApiService, useValue: mockApiService }
      ]
    });

    service = TestBed.inject(VideosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('likeVideo debería hacer POST al endpoint correcto', () => {
    const video: Video = {
      id_video: 'abc123',
      id_usuario: 'user1',   
    
    };

    service.likeVideo(video).subscribe(res => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${mockApiUrl}/likeVideo`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(video);
    req.flush({ success: true });
  });

  it('dislikeVideo debería hacer POST al endpoint correcto', () => {
    const video: Video = {
      id_video: 'abc123',
      id_usuario: 'user1',   
    
    };

    service.dislikeVideo(video).subscribe(res => {
      expect(res).toEqual({ status: 'removed' });
    });

    const req = httpMock.expectOne(`${mockApiUrl}/dislikeVideo`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(video);
    req.flush({ status: 'removed' });
  });

  it('getLikedVideos debería hacer GET al endpoint correcto con id', () => {
    const userId = 'u123';
    const mockResponse = [{ id_video: 'v1' }, { id_video: 'v2' }];

    service.getLikedVideos(userId).subscribe(videos => {
      expect(videos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/getVideos/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
