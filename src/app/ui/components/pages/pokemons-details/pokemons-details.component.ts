import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../../services/pokemon.service';
import { Chart, registerables } from 'chart.js';
import { NgFor } from '@angular/common';
import { DescriptionService } from '../../../services/description.service';
import { Description } from '../../../interfaces/description';

Chart.register(...registerables);

@Component({
  selector: 'app-pokemons-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, RouterLink],
  templateUrl: './pokemons-details.component.html',
  styleUrl: './pokemons-details.component.scss',
  providers: [PokemonService, DescriptionService]
})
export class PokemonsDetailsComponent implements OnInit {
  pokemonStats: { name: string; base_stat: number }[] = [];
  @ViewChild('radarChart', { static: true }) radarChart!: ElementRef<HTMLCanvasElement>;

  pokemonName!: string;
  pokemonTypes: string[] = [];
  id!: number;
  chartInstance!: Chart | null; // Armazena a instância do gráfico
  descriptionText!: string; // Propriedade para armazenar a descrição
  description: Description[] = []; // Array de descrições

  constructor(
    private route: ActivatedRoute,
    private readonly pokemonService: PokemonService,
    private readonly descriptionService: DescriptionService
  ) {}

  ngOnInit(): void {
    // Observa mudanças nos parâmetros da rota
    this.route.paramMap.subscribe((params) => {
      const pokemonId = params.get('id'); // Obtém o ID do Pokémon da rota
      if (pokemonId) {
        this.id = +pokemonId; // Converte o ID para número
        this.loadPokemonDetails(this.id); // Carrega os detalhes do Pokémon
        this.loadPokemonDescription(this.id); // Carrega a descrição do Pokémon
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

  loadPokemonDescription(pokemonId: number): void {
    // Busca a descrição do Pokémon com base no ID
    this.descriptionService.getDescription().subscribe((response: Description[]) => {
      const pokemonDescription = response.find((desc: Description) => desc.id === pokemonId); // Encontra a descrição correspondente ao ID
      this.descriptionText = pokemonDescription?.description || 'Descrição não encontrada'; // Atribui a descrição ou uma mensagem padrão
      return this.descriptionText // Log da descrição
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
    const num_formatado = this.id.toString().padStart(3, '0');
    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${num_formatado}.png`;
  }
}
