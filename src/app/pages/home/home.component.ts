import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { VideoCarrouselComponent } from '../../components/video-carrousel/video-carrousel.component';

@Component({
  selector: 'app-home',
  imports: [VideoListComponent,VideoCarrouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  videos: any[] = [];
  videoInfo: any;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    const videoId = 'ID_DEL_VIDEO';
    this.youtubeService.getVideoInfo(videoId).subscribe(data => {
      this.videoInfo = data.items[0];
    });

    const maxResults = 5; // Puedes ajustar este número según tus necesidades
    this.youtubeService.getRandomVideos(maxResults).subscribe(data => {
      this.videos = data.items;
    });
  }

}
