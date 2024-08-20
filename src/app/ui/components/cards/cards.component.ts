import { Component, Input, AfterViewInit, HostBinding } from '@angular/core';
import {NgFor} from '@angular/common'
import { Pokemon } from '../../interfaces/pokemon'; 
import { PokemonTypes } from '../../interfaces/pokemon-types';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor,],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @HostBinding('style.animationDelay') animationDelay!: string;

  @Input()
  pokemon!: Pokemon;

  @Input()
  numero!:number;
  
  @Input()
  nome!:string;

  

  async getTypes(): Promise<string[]> {
    return this.pokemon.types.map(type => type.types.name) || [];
  }

  //getTypes(): string[] {
  //  return this.pokemon?.types.map(type => type.type.name) || [];
  //}


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
