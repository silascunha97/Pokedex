import { Component, Input } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { NgFor } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

import { Type } from '@angular/compiler';
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-grid-layout',
  standalone: true,
  imports: [
    CardsComponent,
    NgFor,
    SearchBarComponent
],
  templateUrl: './grid-layout.component.html',
  styleUrl: './grid-layout.component.scss'
})
export class GridLayoutComponent {

  types: Type[] = []


constructor(public pokemonService: PokemonService){}



}