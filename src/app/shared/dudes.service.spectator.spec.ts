import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { DUDES, FAVORITE_DUDES_STORAGE_KEY } from './dudes.constant';

import { DudesService } from './dudes.service';

describe('DudesService', () => {
  let spectator: SpectatorService<DudesService>;
  const createService = createServiceFactory(DudesService);

  beforeEach(() => (spectator = createService()));

  describe('getDudes', () => {
    it('should return DUDES array constant', () => {
      expect(spectator.service.getDudes()).toEqual(DUDES);
    });
  });

  describe('getFavoriteDudes', () => {
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should return an empty array', () => {
        expect(spectator.service.getFavoriteDudes()).toEqual([]);
      });
    });

    describe('When there are favorite dudes in local storage', () => {
      const dudes: string[] = ['mickey', 'donald'];
      beforeEach(() =>
        localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes.join(';'))
      );

      it('should return the expected array of dudes', () => {
        expect(spectator.service.getFavoriteDudes()).toEqual(dudes);
      });
    });
  });

  describe('isFavorite', () => {
    const dude = 'woofy';
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should return false', () => {
        expect(spectator.service.isFavorite(dude)).toBe(false);
      });
    });

    describe('When there are favorite dudes in local storage not containing our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should return false', () => {
        expect(spectator.service.isFavorite(dude)).toBe(false);
      });
    });

    describe('When there are favorite dudes in local storage containing our dude', () => {
      const dudes = 'mickey;donald;woofy';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should return true', () => {
        expect(spectator.service.isFavorite(dude)).toBe(true);
      });
    });
  });

  describe('addFavorite', () => {
    const dude = 'woofy';
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should add the favorite dude in the local storage', () => {
        spectator.service.addFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dude);
      });
    });

    describe('When there are favorite dudes in local storage not containing our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should append the favorite dude to the existing list', () => {
        spectator.service.addFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(
          `${dudes};${dude}`
        );
      });
    });

    describe('When there are favorite dudes in local storage containing our dude', () => {
      const dudes = `mickey;donald;${dude}`;
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should remain the same as before', () => {
        spectator.service.addFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dudes);
      });
    });
  });

  describe('removeFavorite', () => {
    const dude = 'woofy';
    describe('When favorite dudes in local storage do not contain our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should remain as before', () => {
        spectator.service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dudes);
      });
    });

    describe('When favorite dudes in local storage contain our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() =>
        localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, `${dudes};${dude}`)
      );

      it('should remove our dude from the local storage', () => {
        spectator.service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dudes);
      });
    });

    describe('When there is one favorite dude in local storage that is our dude', () => {
      const dudes = 'woofy';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should remain an empty list', () => {
        spectator.service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual('');
      });
    });
  });
});
