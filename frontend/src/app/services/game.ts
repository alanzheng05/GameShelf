import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { environment } from '../../environments/environment';

type CreateUpdateBody = Omit<Game, '_id'>;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    const body = this.toWriteBody(game);
    return this.http.post<Game>(`${this.baseUrl}/games`, body);
  }

  updateGame(id: string, game: Game): Observable<Game> {
    const body = this.toWriteBody(game);
    return this.http.put<Game>(`${this.baseUrl}/games/${id}`, body);
  }

  deleteGame(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/games/${id}`);
  }

  /** Proxied IGDB search from the Express `/api/search` route. */
  searchGames(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params: { query } });
  }

  private toWriteBody(game: Game): CreateUpdateBody {
    const { _id: _idIgnored, ...rest } = game;
    return rest;
  }
}
