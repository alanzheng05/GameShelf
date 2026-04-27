import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game';
import { Game } from '../../models/game';
import { GameCard } from '../../components/game-card/game-card';

type StatusFilter = 'all' | Game['status'];

@Component({
  selector: 'app-library',
  imports: [CommonModule, RouterLink, GameCard],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library implements OnInit {
  games: Game[] = [];
  statusFilter: StatusFilter = 'all';
  isLoading = false;
  errorMessage = '';

  readonly filters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'playing', label: 'Playing' },
    { value: 'completed', label: 'Completed' },
    { value: 'wishlist', label: 'Wishlist' }
  ];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  get filteredGames(): Game[] {
    if (this.statusFilter === 'all') {
      return this.games;
    }
    return this.games.filter((g) => g.status === this.statusFilter);
  }

  loadGames() {
    this.isLoading = true;
    this.errorMessage = '';
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load your library.';
        this.isLoading = false;
        console.error('Error loading games:', err);
      }
    });
  }

  setFilter(f: StatusFilter) {
    this.statusFilter = f;
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe({
      next: () => this.loadGames(),
      error: () => {
        this.errorMessage = 'Could not delete game.';
      }
    });
  }
}