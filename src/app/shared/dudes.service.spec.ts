import { TestBed } from '@angular/core/testing';
import { DUDES, FAVORITE_DUDES_STORAGE_KEY } from './dudes.constant';

import { DudesService } from './dudes.service';

describe('DudesService', () => {
  let service: DudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DudesService);
  });

  describe('getDudes', () => {
    it('should return DUDES array constant', () => {
      expect(service.getDudes()).toEqual(DUDES);
    });
  });

  describe('getFavoriteDudes', () => {
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should return an empty array', () => {
        expect(service.getFavoriteDudes()).toEqual([]);
      });
    });

    describe('When there are favorite dudes in local storage', () => {
      const dudes: string[] = ['mickey', 'donald'];
      beforeEach(() =>
        localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes.join(';'))
      );

      it('should return the expected array of dudes', () => {
        expect(service.getFavoriteDudes()).toEqual(dudes);
      });
    });
  });

  describe('isFavorite', () => {
    const dude = 'woofy';
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should return false', () => {
        expect(service.isFavorite(dude)).toBe(false);
      });
    });

    describe('When there are favorite dudes in local storage not containing our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should return false', () => {
        expect(service.isFavorite(dude)).toBe(false);
      });
    });

    describe('When there are favorite dudes in local storage containing our dude', () => {
      const dudes = 'mickey;donald;woofy';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should return true', () => {
        expect(service.isFavorite(dude)).toBe(true);
      });
    });
  });

  describe('addFavorite', () => {
    const dude = 'woofy';
    describe('When there is no favorite dude in local storage', () => {
      beforeEach(() => localStorage.removeItem(FAVORITE_DUDES_STORAGE_KEY));

      it('should add the favorite dude in the local storage', () => {
        service.addFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dude);
      });
    });

    describe('When there are favorite dudes in local storage not containing our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should append the favorite dude to the existing list', () => {
        service.addFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(
          `${dudes};${dude}`
        );
      });
    });

    describe('When there are favorite dudes in local storage containing our dude', () => {
      const dudes = `mickey;donald;${dude}`;
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should remain the same as before', () => {
        service.addFavorite(dude);
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
        service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dudes);
      });
    });

    describe('When favorite dudes in local storage contain our dude', () => {
      const dudes = 'mickey;donald';
      beforeEach(() =>
        localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, `${dudes};${dude}`)
      );

      it('should remove our dude from the local storage', () => {
        service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual(dudes);
      });
    });

    describe('When there is one favorite dude in local storage that is our dude', () => {
      const dudes = 'woofy';
      beforeEach(() => localStorage.setItem(FAVORITE_DUDES_STORAGE_KEY, dudes));

      it('should remain an empty list', () => {
        service.removeFavorite(dude);
        expect(localStorage.getItem(FAVORITE_DUDES_STORAGE_KEY)).toEqual('');
      });
    });
  });
});
