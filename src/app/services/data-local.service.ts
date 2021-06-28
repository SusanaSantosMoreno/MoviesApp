import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle, Genre } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private _storage: Storage, private toastCtrl: ToastController) {
    this.init();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  async init() {
    await this._storage.create();
    this.cargarFavoritos();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    const existe = this.peliculas.find(peli => peli.id === pelicula.id);
    //operador ternario que comprueba que el objeto exista
    (existe) ? true : false;
    let mensaje = '';

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id != pelicula.id);
      mensaje = 'Pelicula eliminada de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Pelicula añadida a favoritos';
    }
    this.presentToast(mensaje);
    this._storage.set('Peliculas', this.peliculas);
  }

  async cargarFavoritos() {
    const pelis = await this._storage.get('Peliculas');
    this.peliculas = pelis || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    //operador ternario que comprueba que el objeto exista
    return (existe) ? true : false;
  }

  async peliculasPorGenero(genero: Genre) {
    const peliculasPorGenero = [];
    this.peliculas.forEach(element => {
      let generos = element.genres;
      generos.forEach(generoPelicula => {
        if (generoPelicula.id == genero.id) {
          console.log("include");
          peliculasPorGenero.push(element);
        }
      });
    });

    return peliculasPorGenero;
  }
}
