import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pokemons-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './pokemons-details.component.html',
  styleUrl: './pokemons-details.component.scss'
})
export class PokemonsDetailsComponent implements OnInit {
  pokemonStats: { name: string; base_stat: number }[] = [];
  @ViewChild('radarChart', { static: true }) radarChart!: ElementRef<HTMLCanvasElement>;

  pokemonName!: string;
  pokemonTypes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly pokemonService: PokemonService
  ) {}

  getPokemonNameAndTypes(): void {
    const pokemonId = this.route.snapshot.params['id']; // Obtém o ID do Pokémon da rota
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((response: any) => {
      this.pokemonName = response.name; // Nome do Pokémon
      this.pokemonTypes = response.types.map((typeInfo: any) => typeInfo.type.name); // Tipos do Pokémon
      console.log(this.pokemonName, this.pokemonTypes); // Exibe o nome e os tipos no console
    });
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonDetails(this.route.snapshot.params['id'])
      .subscribe((response: any) => {
        this.pokemonStats = response.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat
        }));
        this.renderRadarChart();
        
      });

      this.getPokemonNameAndTypes();
    
  }

  

  renderRadarChart(): void {
    const ctx = this.radarChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.pokemonStats.map(stat => stat.name),
          datasets: [
            {
              label: 'Base Stats',
              data: this.pokemonStats.map(stat => stat.base_stat),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }



  getImagemPokemon() {
    const num_formatado = this.route.snapshot.params['id'].padStart(3, '0');
    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${num_formatado}.png`;
  }
}
