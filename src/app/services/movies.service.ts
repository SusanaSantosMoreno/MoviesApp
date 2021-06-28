/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMDB, PeliculaDetalle, RespuestaCredits, SocialMedia, Pelicula } from '../Interfaces/interfaces';
import { environment } from '../../environments/environment';

const url = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  private Get<T>(query: string) {
    query = url + query + `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date(); //hoy
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate(); //ultimo día del mes
    const mes = hoy.getMonth() + 1;
    let mesString = mes < 10 ? '0' + mes : mes;

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.Get<ResponseMDB>
      (`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popularesPage++;
    const query = '/discover/movie?sort_by=popularity.desc&page=' + this.popularesPage;
    return this.Get<ResponseMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.Get<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.Get<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getSocialMediaPelicula(id: string) {
    return this.Get<SocialMedia>(`/movie/${id}/external_ids?a=1`);
  }

  buscarPelicula(pelicula: string) {
    return this.Get<Pelicula>(`/search/movie?query=${pelicula}`);
  }
}
