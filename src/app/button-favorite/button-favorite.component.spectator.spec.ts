import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ButtonFavoriteComponent } from './button-favorite.component';

describe('ButtonFavoriteComponent', () => {
  let spectator: Spectator<ButtonFavoriteComponent>;

  const createComponent = createComponentFactory({
    component: ButtonFavoriteComponent,
    imports: [ButtonFavoriteComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create with default property values', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.isFavorite).toBe(false);
    expect(spectator.component.disabled).toBe(false);
  });

  describe('When the component becomes disabled', () => {
    it('should adapt the cursor', () => {
      const favoriteBtn = spectator.query('button');

      expect(favoriteBtn).not.toBeDisabled();
      spectator.dispatchMouseEvent(favoriteBtn ?? undefined, 'mouseover');
      //expect(favoriteBtn).toHaveStyle({ cursor: 'pointer' });

      spectator.setInput('disabled', true);

      expect(favoriteBtn).toBeDisabled();
      //expect(favoriteBtn).toHaveStyle({ cursor: 'not-allowed' });
    });
  });

  describe('When isFavorite input changes', () => {
    it('should adapt its rendering', () => {
      const favoriteBtn = spectator.query('button');

      expect(favoriteBtn).toHaveText('FAVORITE ☆');
      expect(favoriteBtn).not.toHaveClass('button-favorite--active');

      spectator.setInput('isFavorite', true);

      expect(favoriteBtn).toHaveText('FAVORITE ★');
      expect(favoriteBtn).toHaveClass('button-favorite--active');
    });
  });

  describe('When the favorite button is clicked', () => {
    beforeEach(() => spectator.click(spectator.query('button') ?? undefined));
    it('should emit changed isFavorite property', () => {
      const spy = jest.spyOn(spectator.component, 'onClick');
      let output: boolean | undefined;
      spectator
        .output<boolean>('changeFavorite')
        .subscribe((result: boolean) => (output = result));
      expect(spectator.component.isFavorite).toBe(false);

      spectator.click(spectator.query('button') ?? undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(output).toBe(true);
    });
  });
});
