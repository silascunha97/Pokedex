import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { NgFor } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-grid-layout',
  standalone: true,
  imports: [
    CardsComponent,
    NgFor
  ],
  templateUrl: './grid-layout.component.html',
  styleUrl: './grid-layout.component.scss'
})
export class GridLayoutComponent {

constructor(public pokemonService: PokemonService){}

test='Teste #001'
//numero:number = 0;
}
