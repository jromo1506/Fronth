import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { VideoCarrouselComponent } from '../../components/video-carrousel/video-carrousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [VideoCarrouselComponent,CommonModule],
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








  //MOCK VIDEOS

  /*
  videos: any[] = [
  {
    id: { videoId: 'mock1' },
    snippet: {
      title: 'Video de prueba 1',
      description: 'Descripción del video 1',
      thumbnails: {
        medium: {
          url: '../../../assets/img/video.png'
        }
      },
      channelTitle: 'Canal de prueba 1'
    },
    isStarred: false
  },
  {
    id: { videoId: 'mock2' },
    snippet: {
      title: 'Video de prueba 2',
      description: 'Descripción del video 2',
      thumbnails: {
        medium: {
          url: 'https://via.placeholder.com/320x180?text=Video+2'
        }
      },
      channelTitle: 'Canal de prueba 2'
    },
    isStarred: false
  },
  {
    id: { videoId: 'mock3' },
    snippet: {
      title: 'Video de prueba 3',
      description: 'Descripción del video 3',
      thumbnails: {
        medium: {
          url: 'https://via.placeholder.com/320x180?text=Video+3'
        }
      },
      channelTitle: 'Canal de prueba 3'
    },
    isStarred: true
  }
];
*/

}
