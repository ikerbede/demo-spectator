import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { DUDES } from '../shared/dudes.constant';
import { DudesService } from '../shared/dudes.service';

import { ButtonFavoriteComponent } from '../button-favorite/button-favorite.component';
import { DudeCardComponent } from './dude-card.component';
import { MockComponent } from 'ng-mocks';

describe('DudeCardComponent', () => {
  let spectator: Spectator<DudeCardComponent>;
  let service: DudesService;

  const mockDudesService: Partial<DudesService> = {
    isFavorite: jest.fn().mockReturnValue(true),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  };

  const createComponent = createComponentFactory({
    component: DudeCardComponent,
    imports: [DudeCardComponent, MockComponent(ButtonFavoriteComponent)],
    providers: [{ provide: DudesService, useValue: mockDudesService }],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { dude: DUDES[0] } });
    spectator.detectChanges();
    service = spectator.inject(DudesService);
  });

  it('should create component setting properties as expected', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.isFavorite).toBe(true);
    expect(spectator.component.dude).toEqual(DUDES[0]);
  });

  describe('changeFavorite', () => {
    describe('When our dude is already a favorite', () => {
      beforeEach(() => {
        spectator.component.isFavorite = true;
        spectator.detectChanges();
      });

      it('should remove him from the favorite list', () => {
        spectator.component.changeFavorite();
        expect(service.removeFavorite).toHaveBeenCalledWith(
          spectator.component.dude.name
        );
        expect(spectator.component.isFavorite).toBe(false);
      });
    });

    describe('When our dude is not already a favorite', () => {
      beforeEach(() => {
        spectator.component.isFavorite = false;
        spectator.detectChanges();
      });

      it('should add him into the favorite list', () => {
        spectator.component.changeFavorite();
        expect(service.addFavorite).toHaveBeenCalledWith(
          spectator.component.dude.name
        );
        expect(spectator.component.isFavorite).toBe(true);
      });
    });
  });

  describe('DOM rendering', () => {
    it('should render the dude name', () => {
      const targetElt = spectator.query('.dude-card-header-title');
      expect(targetElt).toHaveText(spectator.component.dude.name);
    });

    it('should render the dude role', () => {
      const targetElt = spectator.query('.dude-card-content-role');
      expect(targetElt).toHaveText(spectator.component.dude.role);
    });

    it('should render the dude team', () => {
      const targetElt = spectator.query('.dude-card-content-team');
      expect(targetElt).toHaveText(spectator.component.dude.team);
    });

    it('should render the dude birth year', () => {
      const targetElt = spectator.query('.dude-card-content-birthYear');
      expect(targetElt).toHaveText(`${spectator.component.dude.birthYear}`);
    });
  });

  describe('DOM events', () => {
    describe('Favorite Button', () => {
      it('should call changeFavorite function', () => {
        const spy = jest.spyOn(spectator.component, 'changeFavorite');

        expect(spectator.component.isFavorite).toBe(true);

        spectator.triggerEventHandler(
          'iker-button-favorite',
          'changeFavorite',
          false
        );

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spectator.component.isFavorite).toBe(false);
      });
    });
  });
});
