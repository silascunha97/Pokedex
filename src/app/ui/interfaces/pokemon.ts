import { PokemonTypes } from "./pokemon-types";

export interface Pokemon {
    name: string;
    types: PokemonTypes[];
}
