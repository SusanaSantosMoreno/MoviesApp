import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ResponseMDB, Pelicula } from '../Interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes : Pelicula[] = [];

  constructor(private moviesService : MoviesService) {}
  
  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((respuesta) => {
      console.log('respuesta: ', respuesta);
      this.peliculasRecientes = respuesta.results;
    });
  }

}
