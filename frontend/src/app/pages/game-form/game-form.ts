import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css'
})
export class GameForm implements OnInit {
  game: Game = {
    title: '',
    platform: '',
    status: 'playing',
    notes: ''
  };

  isEdit = false;
  id = '';
  isSaving = false;
  errorMessage = '';

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.gameService.getGame(this.id).subscribe({
        next: (data) => {
          this.game = data;
        },
        error: () => {
          this.errorMessage = 'Could not load game details.';
        }
      });
    }
  }

  saveGame() {
    this.errorMessage = '';
    this.isSaving = true;

    if (this.isEdit) {
      this.gameService.updateGame(this.id, this.game).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Could not update game.';
        }
      });
    } else {
      this.gameService.addGame(this.game).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Could not create game.';
        }
      });
    }
  }
}