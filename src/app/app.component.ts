import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { FooterComponent } from './ui/components/footer/footer.component';
import { GridLayoutComponent } from './ui/components/grid-layout/grid-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './ui/services/pokemon.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
           NavbarComponent,
           FooterComponent,
           GridLayoutComponent,
           HttpClientModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[PokemonService]
})
export class AppComponent {
  title = 'Pokedex - Utilizando Poké API V.2';
}
