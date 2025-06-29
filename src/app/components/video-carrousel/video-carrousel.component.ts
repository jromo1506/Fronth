import { Component, Input, SimpleChanges } from '@angular/core';
import { VideoListComponent } from '../video-list/video-list.component';
import { CommonModule } from '@angular/common';
declare var $: any;

import { trigger,transition,style,animate} from '@angular/animations';

@Component({
  selector: 'app-video-carrousel',
  imports: [CommonModule],
  templateUrl: './video-carrousel.component.html',
  styleUrl: './video-carrousel.component.scss',
  animations:[
    trigger('slideInUp',[
      transition(':enter',[
        style({opacity:0,transform:'translateY(-10px)'}),
        animate('500ms ease-out',style({opacity:1,transform:'translateY(0'}))
      ])
    ])
  ]
})
export class VideoCarrouselComponent {

  @Input() videosYT: any[] = [];
 



  ngAfterViewInit(): void {

    
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
        1200: { items: 4 },
      }
    });

    console.log(this.videosYT,"Los videos");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videosYT']) {
      console.log('Videos updated:', this.videosYT);
    }
  }
}
