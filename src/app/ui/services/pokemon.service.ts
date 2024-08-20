import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
    this.carregarPokemons();
  }

  async carregarPokemons() {
    const requisicao = await this.httpClient
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .toPromise();

    const pokemons = requisicao.results.map((result: any, index: number) => ({
      ...result,
      numero: index + 1, // Adiciona o número do Pokémon
    }));

    // Busca os tipos para cada Pokémon
    const pokemonDetails$: Observable<Pokemon>[] = pokemons.map((pokemon: any) =>
      this.getPokemonDetails(pokemon.numero).pipe(
        map((details: any) => ({
          ...pokemon,
          types: details.types.map((typeInfo: any) => typeInfo.type.name), // Apenas os nomes dos tipos
        }))
      )
    );

    // Aguarda todas as requisições de tipos terminarem
    forkJoin(pokemonDetails$).subscribe((pokemonsComTipos: Pokemon[]) => {
      this.pokemons = pokemonsComTipos;
    });
  }

  // Método para buscar detalhes do Pokémon, incluindo os tipos
  getPokemonDetails(id: number): Observable<any> {
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }
}
