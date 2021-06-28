import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle, SocialMedia } from '../../Interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  socialMediaPelicula: SocialMedia = {};
  oculto = 150;
  actores: Cast = {};
  slideOptActores = {
    slidesPerView: 2.3,
    freeMode: true
  }
  existe = false;

  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }

  async ngOnInit() {
    this.existe = await this.dataLocal.existePelicula(this.id);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      this.actores = resp;
    });

    this.moviesService.getSocialMediaPelicula(this.id).subscribe(resp => {
      this.socialMediaPelicula = resp;
    })
  }

  volver() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    this.existe = !this.existe;
    this.dataLocal.guardarPelicula(this.pelicula);
  }

}
