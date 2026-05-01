import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  @Input({ required: true }) game!: Game;
  @Output() delete = new EventEmitter<string>();

  initials(): string {
    const t = this.game.title?.trim() || '';
    if (!t) {
      return '?';
    }
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2 && parts[0][0] && parts[1][0]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return t.slice(0, 2).toUpperCase();
  }

  coverUrl(): string {
    const raw = this.game.coverUrl;
    if (!raw || typeof raw !== 'string') {
      return '';
    }
    const normalized = raw.startsWith('//') ? `https:${raw}` : raw;
    return normalized.replace(/t_[^/]+/, 't_cover_small');
  }

  get statusLabel(): string {
    switch (this.game.status) {
      case 'playing':
        return 'Playing';
      case 'completed':
        return 'Completed';
      case 'wishlist':
        return 'Wishlist';
      default:
        return this.game.status;
    }
  }

  onDelete() {
    if (this.game._id) {
      this.delete.emit(this.game._id);
    }
  }
}
