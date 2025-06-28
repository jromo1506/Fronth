import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
 searchQuery: string = ''; // Variable para almacenar el valor del parámetro query
  videos: any[] = [];
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
