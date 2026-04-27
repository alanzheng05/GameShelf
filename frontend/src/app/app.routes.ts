import { Routes } from '@angular/router';
import { Library } from './pages/library/library';
import { GameForm } from './pages/game-form/game-form';
import { Search } from './pages/search/search';

export const routes: Routes = [
  { path: '', component: Library },
  { path: 'add', component: GameForm },
  { path: 'edit/:id', component: GameForm },
  { path: 'search', component: Search }
];