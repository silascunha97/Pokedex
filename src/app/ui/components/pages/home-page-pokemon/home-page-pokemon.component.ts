import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home-page-pokemon',
  standalone: true,
  imports: [NgbCarouselModule, RouterModule, CommonModule, RouterLink],
  templateUrl: './home-page-pokemon.component.html',
  styleUrl: './home-page-pokemon.component.scss',
  providers: [],
})
export class HomePagePokemonComponent {


 
}
