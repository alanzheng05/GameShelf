export interface Game {
  _id?: string;
  title: string;
  platform: string;
  status: 'playing' | 'completed' | 'wishlist';
  notes?: string;
  coverUrl?: string;
  /** Set when added from demo search (IGDB id in production). */
  igdbId?: number;
}