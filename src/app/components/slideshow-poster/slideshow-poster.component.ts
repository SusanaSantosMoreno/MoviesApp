import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true
  };

  constructor() { }

  ngOnInit() { }

}
