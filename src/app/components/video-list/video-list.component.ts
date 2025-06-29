import { Component, Input, SimpleChanges } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { UserAuthService } from '../../services/user-auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {
isStarred: boolean = false;
  @Input() videosYT: any[] = [];
  credentials: { userId: string, username: string } | null = null;






  constructor(private videosService:VideosService, private userAuth:UserAuthService,) {}

  ngOnInit(): void {
    this.userAuth.credentials$.subscribe(credentials => {
      this.credentials = credentials;
    });

    
  }

 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videos']) {
      // Aquí puedes manejar cualquier lógica adicional cuando los videos cambian
      console.log('Videos changed:', changes['videos'].currentValue);
    }
  }

toggleStar(videoId: string) {
  console.log('Selected video ID:', videoId);

  if (!this.credentials) {
    Swal.fire({
      title: 'Create an account',
      text: 'You need an account to like videos',
      icon: 'warning',
      background: '#333',
      color: '#fff',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  const videoLike: Video = {
    id_usuario: this.credentials.userId,
    id_video: videoId
  };

  this.videosService.likeVideo(videoLike).subscribe(
    (response: any) => {
      console.log('Video liked successfully:', response);

      Swal.fire({
        title: 'Yahoo!',
        text: 'You like this video',
        icon: 'success',
        background: '#333',
        color: '#fff',
        confirmButtonColor: '#3085d6'
      });
    },
    (error: any) => {
      console.error('Error liking video:', error);
    }
  );
}



}
