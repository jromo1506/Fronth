import { TestBed } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environment/environment';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.GoogleAPI;
  const apiKey = environment.YoutubeAPI_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeService]
    });

    service = TestBed.inject(YoutubeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getVideoInfo debería hacer GET con videoId', () => {
    const videoId = 'abc123';

    service.getVideoInfo(videoId).subscribe(response => {
      expect(response).toEqual({ some: 'data' });
    });

    const req = httpMock.expectOne(`${apiUrl}/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`);
    expect(req.request.method).toBe('GET');

    req.flush({ some: 'data' });
  });

  it('getRandomVideos debería hacer GET con maxResults y palabra random', () => {
    const maxResults = 5;

    service.getRandomVideos(maxResults).subscribe(response => {
      expect(response).toEqual({ some: 'randomData' });
    });

    // Como el keyword es random, solo chequeamos la URL parcialmente:
    const req = httpMock.expectOne(req =>
      req.url.startsWith(`${apiUrl}/search`) &&
      req.params.get('maxResults') === maxResults.toString() &&
      req.params.has('q') &&
      req.params.get('type') === 'video' &&
      req.params.get('key') === apiKey
    );

    expect(req.request.method).toBe('GET');

    req.flush({ some: 'randomData' });
  });

  it('searchVideos debería mapear response.items y loggear', () => {
    const query = 'angular';
    const maxResults = 3;
    const mockResponse = { items: [{ id: 1 }, { id: 2 }] };

    spyOn(console, 'log');
    spyOn(console, 'error');

    service.searchVideos(query, maxResults).subscribe(items => {
      expect(items).toEqual(mockResponse.items);
      expect(console.log).toHaveBeenCalledWith('Search response:', mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${apiKey}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('searchVideos debería lanzar error si la respuesta es inesperada', () => {
    const query = 'test';
    const maxResults = 2;

    spyOn(console, 'error');

    service.searchVideos(query, maxResults).subscribe({
      next: () => fail('No debería emitir next'),
      error: (error) => {
        expect(error.message).toBe('Failed to search videos');
        expect(console.error).toHaveBeenCalled();
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${apiKey}`);
    req.flush({}, { status: 200, statusText: 'OK' }); // Respuesta sin .items
  });
});
