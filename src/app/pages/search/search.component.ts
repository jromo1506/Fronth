import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { CommonModule } from '@angular/common';


import { trigger,transition,style,animate} from '@angular/animations';

@Component({
  selector: 'app-search',
  imports: [VideoListComponent,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  animations:[
    trigger('slideInUp',[
      transition(':enter',[
        style({opacity:0,transform:'translateY(-10px)'}),
        animate('500ms ease-out',style({opacity:1,transform:'translateY(0'}))
      ])
    ])
  ]
})
export class SearchComponent {
 searchQuery: string = ''; // Variable para almacenar el valor del parámetro query
  //videos: any[] = [];


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
  isLoading: boolean = false;
  error: string = '';
  
  constructor(private route: ActivatedRoute, private youtubeService:YoutubeService) {
    
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Acceder al valor del parámetro 'query'
      this.searchQuery = params['query'];
      console.log('Query parameter:', this.searchQuery); // Esto imprimirá el valor en la consola

      if (this.searchQuery) {
        // Aquí puedes realizar la búsqueda de videos o cualquier otra acción
        this.searchVideos(this.searchQuery,5);
      }
    });


  }



  searchVideos(query: string, maxResults: number) {
    this.youtubeService.searchVideos(query, maxResults).subscribe({
      next: (items: any[]) => {
        this.videos = items; // Aquí asignamos directamente los videos
        console.log('Videos:', this.videos); // Verifica que se extraigan correctamente los videos
      },
      error: (error) => {
        console.error('Error fetching videos', error);
      }
    });
  }

}
