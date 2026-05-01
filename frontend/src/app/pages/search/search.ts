import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game';
import { Game } from '../../models/game';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  query = '';
  results: any[] = [];
  isLoading = false;
  message = '';
  addedResults = new Set<string>();

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef
  ) {}

  search() {
    const cleaned = this.query.trim();
    if (!cleaned) {
      this.message = 'Enter a game title to search.';
      this.results = [];
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.addedResults.clear();
    this.gameService.searchGames(cleaned).subscribe({
      next: (data: any[]) => {
        this.results = data;
        this.isLoading = false;
        if (!data.length) {
          this.message = 'No games found.';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.results = [];
        this.message = 'Something went wrong. Try again.';
        this.cdr.detectChanges();
      }
    });
  }

  addToLibrary(result: any) {
    if (this.isAdded(result)) {
      return;
    }
    const coverUrl = this.getCoverUrl(result, 'cover_small');
    const gameToCreate: Game = {
      title: result.name ?? 'Unknown title',
      platform: this.getPlatformLabel(result),
      status: 'wishlist',
      notes: result.summary ?? '',
      coverUrl: coverUrl || undefined,
      igdbId: typeof result.id === 'number' ? result.id : undefined
    };

    this.gameService.addGame(gameToCreate).subscribe({
      next: () => {
        this.message = `${gameToCreate.title} added to your library.`;
        this.addedResults.add(this.resultKey(result));
        this.cdr.detectChanges();
      },
      error: () => {
        this.message = 'Could not add game to library.';
      }
    });
  }

  isAdded(result: any): boolean {
    return this.addedResults.has(this.resultKey(result));
  }

  getPlatformsText(result: any): string {
    return this.getPlatformLabel(result);
  }

  private getPlatformLabel(result: any): string {
    if (!result.platforms || !result.platforms.length) {
      return 'Unknown platform';
    }
    return result.platforms.map((platform: { name: string }) => platform.name).join(', ');
  }

  initialsFromName(name: string): string {
    const t = (name || '').trim();
    if (!t) {
      return '?';
    }
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2 && parts[0][0] && parts[1][0]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return t.slice(0, 2).toUpperCase();
  }

  getCoverUrl(result: any, size: 'cover_small' | 'cover_big' | 'thumb' = 'cover_small'): string {
    const raw = result?.cover?.url;
    if (!raw || typeof raw !== 'string') {
      return '';
    }
    const normalized = raw.startsWith('//') ? `https:${raw}` : raw;
    return normalized.replace(/t_[^/]+/, `t_${size}`);
  }

  private resultKey(result: any): string {
    const id = typeof result?.id === 'number' ? `id:${result.id}` : '';
    if (id) {
      return id;
    }
    return `name:${(result?.name || '').toLowerCase()}`;
  }
}