import { Routes } from '@angular/router';
import { GridLayoutComponent } from './ui/components/grid-layout/grid-layout.component';
import { PokemonsDetailsComponent } from './ui/components/pages/pokemons-details/pokemons-details.component';

export const ROUTES: Routes = [
    {
        path: '', 
        component: GridLayoutComponent
    },
    {
        path: 'pokemon-details',
        loadComponent: () => import('./ui/components/pages/pokemons-details/pokemons-details.component').then(m => m.PokemonsDetailsComponent) 
 
    },
    {
        path: 'pokemon-details/:id',
        loadComponent: () => import('./ui/components/pages/pokemons-details/pokemons-details.component').then(m => m.PokemonsDetailsComponent) 
 
    },
];
