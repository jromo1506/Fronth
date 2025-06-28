import { Component, Input, SimpleChanges } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { UserAuthService } from '../../services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-list',
  imports: [],
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

    var videoLike={
       id_usuario:this.credentials?.userId,
       id_video: videoId ,

    }



    // Aquí podrías llamar al servicio para hacer la petición con el ID del video
    this.videosService.likeVideo(videoLike).subscribe(
    (response:any) => {

      if(this.credentials){
        console.log('Video liked successfully:', response);

       
        Swal.fire({
          title: 'Yahoo!',
          text: 'You like this video',
          icon: 'success',
          background: '#333', // Fondo oscuro
          color: '#fff', // Texto en blanco
          confirmButtonColor: '#3085d6'
        });
      }
      else{
        Swal.fire({
          title: 'Create an account',
          text: 'You need an account to like videos',
          icon: 'warning',
          background: '#333', // Fondo oscuro
          color: '#fff', // Texto en blanco
          confirmButtonColor: '#3085d6'
        });
      }
      
      },
      (error:any) => {

       
        console.error('Error liking video:', error);
      }
    );
  }


}
