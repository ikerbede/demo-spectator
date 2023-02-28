import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { ButtonFavoriteComponent } from './button-favorite.component';

describe('ButtonFavoriteComponent', () => {
  let component: ButtonFavoriteComponent;
  let fixture: ComponentFixture<ButtonFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFavoriteComponent],
    })
      .overrideComponent(ButtonFavoriteComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default property values', () => {
    expect(component).toBeTruthy();
    expect(component.isFavorite).toBe(false);
    expect(component.disabled).toBe(false);
  });

  describe('When the component becomes disabled', () => {
    it('should adapt the cursor', () => {
      const favoriteBtn: HTMLButtonElement =
        fixture.nativeElement.querySelector('button');

      expect(favoriteBtn.disabled).toBeFalsy();
      //expect(getComputedStyle(favoriteBtn).cursor).toEqual('pointer');

      component.disabled = true;
      fixture.detectChanges();

      expect(favoriteBtn.disabled).toBeTruthy();
      //expect(getComputedStyle(favoriteBtn).cursor).toEqual('not-allowed');
    });
  });

  describe('When isFavorite input changes', () => {
    it('should adapt its rendering', () => {
      const favoriteBtn: HTMLButtonElement =
        fixture.nativeElement.querySelector('button');

      expect(favoriteBtn.textContent).toContain('FAVORITE ☆');
      expect(favoriteBtn.classList).not.toContain('button-favorite--active');

      component.isFavorite = true;
      fixture.detectChanges();

      expect(favoriteBtn.textContent).toContain('FAVORITE ★');
      expect(favoriteBtn.classList).toContain('button-favorite--active');
    });
  });

  describe('When the favorite button is clicked', () => {
    it('should emit changed isFavorite property', () => {
      const spy = jest.spyOn(component, 'onClick');
      let output: boolean | undefined;
      component.changeFavorite
        .pipe(first())
        .subscribe((isFavorite: boolean) => (output = isFavorite));
      expect(component.isFavorite).toBe(false);

      fixture.nativeElement.querySelector('button').click();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(output).toBe(true);
    });
  });
});
