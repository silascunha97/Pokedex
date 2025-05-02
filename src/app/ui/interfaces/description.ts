export interface PokemonEvolution {
    next: [string, string][];
}

export interface Description {
    id: number;
    description: string;
    evolution: PokemonEvolution;
}
