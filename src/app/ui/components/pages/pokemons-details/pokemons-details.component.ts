import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon';
import { Chart, registerables } from 'chart.js';
import { NgFor } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-pokemons-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, RouterLink],
  templateUrl: './pokemons-details.component.html',
  styleUrl: './pokemons-details.component.scss'
})
export class PokemonsDetailsComponent implements OnInit {
  pokemonStats: { name: string; base_stat: number }[] = [];
  @ViewChild('radarChart', { static: true }) radarChart!: ElementRef<HTMLCanvasElement>;

  pokemonName!: string;
  pokemonTypes: string[] = [];
  id!: number;
  chartInstance!: Chart | null; // Armazena a instância do gráfico

  constructor(
    private route: ActivatedRoute,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pokemonId = params.get('id'); // Obtém o ID do Pokémon da rota
      if (pokemonId) {
        this.id = +pokemonId; // Converte o ID para número
        this.loadPokemonDetails(this.id); // Carrega os detalhes do Pokémon
      }
    });
  }

  loadPokemonDetails(pokemonId: number): void {
    // Busca os detalhes do Pokémon
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((response: any) => {
      this.pokemonStats = response.stats.map((stat: any) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
        
      }));
      this.pokemonName = response.name;
      this.pokemonTypes = response.types.map((typeInfo: any) => typeInfo.type.name);
      this.renderRadarChart(); // Atualiza o gráfico
    });
  }

  renderRadarChart(): void {
    const ctx = this.radarChart.nativeElement.getContext('2d');
    if (ctx) {
      // Destroi o gráfico existente, se houver
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Cria um novo gráfico
      this.chartInstance = new Chart(ctx, {
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
