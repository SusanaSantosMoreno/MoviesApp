import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula } from '../../Interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Coco', 'Wonder Woman', 'Fast and Furious 5', 'Glass', 'Disomnia'];
  buscando = false;

  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController) { }

  buscar(event) {
    const valor = event.detail.value;
    if (valor !== '') {
      this.buscando = true;
      this.moviesService.buscarPelicula(valor).subscribe(resp => {
        this.peliculas = resp['results'];
        this.buscando = false;
      });
    }
  }

  seleccionarIdea(item) {
    this.textoBuscar = item;
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    modal.present();
  }
}
