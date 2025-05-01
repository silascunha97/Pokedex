import { PokemonStats } from "./Pokemon-Stats";
import { PokemonTypes } from "./pokemon-types";

export interface Pokemon {
    map
    (arg0: 
        (p: any) => { 
            id: any; 
            name: any; 
            types: any; 
            stats: any; 
        }): Pokemon[];
    id: number;
    name: string;
    types: PokemonTypes[];
    stats: PokemonStats[]
}
