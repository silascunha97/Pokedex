import { Component, Input } from '@angular/core';
import {NgFor} from '@angular/common'

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  @Input()
  pokemon!:string | any;

  @Input()
  numero!:number;

  getImagemPokemon(){
    const num_formatado = this.leadingZero(this.numero)

    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${num_formatado}.png`
  }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }

    return s;
  }

}
