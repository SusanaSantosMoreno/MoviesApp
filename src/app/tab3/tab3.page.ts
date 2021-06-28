import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../Interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.moviesService.getGeneros().subscribe(resp => {
      this.generos = resp['genres'];
    });
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    modal.present();
  }

  async filtrarPeliculas(genero: Genre) {
    console.log(genero);
    this.peliculas = await this.dataLocalService.peliculasPorGenero(genero);
  }

}
