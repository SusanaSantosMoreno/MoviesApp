import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true,
    spaceBetween: -10
  };

  constructor() { }

  ngOnInit() { }

}
