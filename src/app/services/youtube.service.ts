import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

 private apiUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDku2evqiECm-6uqW4wZnQLGxEHwYjalB8';
  private videosSubject = new BehaviorSubject<any[]>([]);
  videos$ = this.videosSubject.asObservable();

  constructor(private http:HttpClient) { }

  
  

  getVideoInfo(videoId: string): Observable<any> {
    const url = `${this.apiUrl}/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails,statistics`;
    return this.http.get(url);
  }


  getRandomVideos(maxResults: number): Observable<any> {
    const randomKeywords = ['code', 'angular', 'nodejs', 'asp.net', 'tutorial', 'linux'];
    const keyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    const url = `${this.apiUrl}/search?part=snippet&maxResults=${maxResults}&q=${keyword}&type=video&key=${this.apiKey}`;
    return this.http.get(url);
  }

  searchVideos(query: string, maxResults: number): Observable<any[]> {
    const searchUrl = `${this.apiUrl}/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${this.apiKey}`;
    
    return this.http.get<any>(searchUrl).pipe(
      tap(response => {
        console.log('Search response:', response);
      }),
      map((response: any) => {
        if (!response || !response.items) {
          throw new Error('Unexpected response format');
        }
        return response.items;
      }),
      catchError(error => {
        console.error('Error in searchVideos:', error);
        throw new Error('Failed to search videos');
      })
    );
  }
}
