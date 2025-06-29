import { Injectable } from '@angular/core';
import { GolbalApiService } from './golbal-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/Video';
@Injectable({
  providedIn: 'root'
})
export class VideosService {


  
  constructor(private api: GolbalApiService, private http: HttpClient) {}

  likeVideo(video: Video): Observable<any> {
    console.log(video, "Like Video");
    return this.http.post(this.api.getURL() + "/likeVideo", video);
  }

  dislikeVideo(video: Video): Observable<any> {
    console.log(video, "Dislike Video");
    return this.http.post(this.api.getURL() + "/dislikeVideo", video);
  }

  getLikedVideos(id: string): Observable<any> {
    console.log(id, "Liked videos");
    return this.http.get(this.api.getURL() + "/getVideos/" + id);
  }

}
