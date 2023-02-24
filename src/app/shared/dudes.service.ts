import { Injectable } from '@angular/core';
import { Dude } from './dude.model';
import { DUDES, FAVORITE_DUDES_STORAGE_KEY } from './dudes.constant';

export const LIST_SEPARATOR = ';';

@Injectable({ providedIn: 'root' })
export class DudesService {
  getDudes(): readonly Dude[] {
    return DUDES;
  }

  getFavoriteDudes(): readonly string[] {
    return (
      localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)?.split(LIST_SEPARATOR) ??
      []
    );
  }

  isFavorite(dudeName: string): boolean {
    return this.getFavoriteDudes().includes(dudeName);
  }

  addFavorite(dudeName: string): void {
    const favoriteDudes = this.getFavoriteDudes();
    if (!favoriteDudes.includes(dudeName)) {
      localStorage.setItem(
        FAVORITE_DUDES_STORAGE_KEY,
        [...favoriteDudes, dudeName].join(LIST_SEPARATOR)
      );
    }
  }

  removeFavorite(dudeName: string): void {
    localStorage.setItem(
      FAVORITE_DUDES_STORAGE_KEY,
      this.getFavoriteDudes()
        .filter((item) => item !== dudeName)
        .join(LIST_SEPARATOR)
    );
  }
}
