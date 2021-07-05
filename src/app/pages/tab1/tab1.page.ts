import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ResponseMDB, Pelicula } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((respuesta) => {
      this.peliculasRecientes = respuesta.results;
    });
    this.getPopulares();

  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe((respuesta) => {
      const arrTemp = [...this.peliculasPopulares, ...respuesta.results];
      this.peliculasPopulares = arrTemp;
    });
  }

}
