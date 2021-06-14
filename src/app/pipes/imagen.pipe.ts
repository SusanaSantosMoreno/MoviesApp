import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const urlImage = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    if(!img){ return; }
    const imgUrl = `${urlImage}/${size}/${img}`;
    return imgUrl;
  }
}
