import { Component } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { UserAuthService } from '../../services/user-auth.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
credentials: { userId: string, username: string } | null = null;
  likedVideos: any[] = [];
  foundVideos: any[] = [];
  loading: boolean = false;
  isLogged: boolean = false;

  constructor(
    private videoService: VideosService,
    private userAuth: UserAuthService,
    private youtubeApi: YoutubeService
  ) {
    this.userAuth.credentials$.subscribe(credentials => {
      this.credentials = credentials;
      this.isLogged = true;
    });
  }

  ngOnInit() {
    if (this.credentials) {
      this.videoService.getLikedVideos(this.credentials.userId).subscribe(likes => {
        this.likedVideos = likes;
        this.findVideos(this.likedVideos);
      });
    } else {
      this.isLogged = false;
    }
  }

  findVideos(videosFind: any[]) {
    this.loading = true;
    this.foundVideos = []; // Limpia el array antes de empezar

    const videoIds = videosFind.map(videofind => videofind.id_video);

    videoIds.forEach(videoId => {
      this.youtubeApi.getVideoInfo(videoId).subscribe(response => {
        if (response && response.items && response.items.length > 0) {
          const video = response.items[0];
          if (video && video.snippet) {
            const transformedVideo = {
              id: video.id,
              snippet: video.snippet,
              statistics: video.statistics || {},
              isStarred: false, // Puedes manejar si un video tiene estrella o no
            };
            this.foundVideos.push(transformedVideo);
          } else {
            console.error('Video no encontrado o datos incompletos', video);
          }
        } else {
          console.error('Respuesta de API sin elementos', response);
        }
        this.loading = this.foundVideos.length === videoIds.length;
      }, error => {
        console.error('Error al obtener la información del video', error);
        this.loading = this.foundVideos.length === videoIds.length;
      });
    });
  }


  toggleStar(videoId: string) {
    // Lógica para manejar el clic en la estrella
    const video = this.foundVideos.find(v => v.id === videoId);
    if (video) {
      video.isStarred = !video.isStarred;
    }
  }
}

