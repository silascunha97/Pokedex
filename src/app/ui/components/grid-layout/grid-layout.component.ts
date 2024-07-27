import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { NgFor } from '@angular/common';

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
pokemons = ['bulbasaur', 'bulbasaur', 'bulbasaur', 'bulbasaur', 'bulbasaur', 'bulbasaur', 'bulbasaur', 'bulbasaur', ];
//numero:number = 0;
}
