import { Injectable } from '@angular/core';
import { Storage } from "@capacitor/storage";
import { ToastController } from '@ionic/angular';
import { Genre, PeliculaDetalle } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})


export class NativeStorageServiceService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  async cargarFavoritos() {
    const pelis = await Storage.get({ key: 'Peliculas' });
    this.peliculas = JSON.parse(pelis.value) || [];
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
    Storage.set({
      key: 'Peliculas',
      value: JSON.stringify(this.peliculas)
    });
  }
}
