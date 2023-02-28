import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { ButtonFavoriteComponent } from '../button-favorite/button-favorite.component';
import { DUDES } from '../shared/dudes.constant';
import { DudesService } from '../shared/dudes.service';
import { DudeCardComponent } from './dude-card.component';

describe('DudeCardComponent', () => {
  let component: DudeCardComponent;
  let fixture: ComponentFixture<DudeCardComponent>;
  let service: DudesService;

  const mockDudesService: Partial<DudesService> = {
    isFavorite: jest.fn().mockReturnValue(true),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DudeCardComponent, MockComponent(ButtonFavoriteComponent)],
      providers: [{ provide: DudesService, useValue: mockDudesService }],
    }).compileComponents();

    service = TestBed.inject(DudesService);

    fixture = TestBed.createComponent(DudeCardComponent);
    component = fixture.componentInstance;
    component.dude = DUDES[0];
    fixture.detectChanges();
  });

  it('should create component setting properties as expected', () => {
    expect(component).toBeTruthy();
    expect(component.isFavorite).toBe(true);
    expect(component.dude).toEqual(DUDES[0]);
  });

  describe('changeFavorite', () => {
    describe('When our dude is already a favorite', () => {
      beforeEach(() => {
        component.isFavorite = true;
        fixture.detectChanges();
      });

      it('should remove him from the favorite list', () => {
        component.changeFavorite();
        expect(service.removeFavorite).toHaveBeenCalledWith(
          component.dude.name
        );
        expect(component.isFavorite).toBe(false);
      });
    });

    describe('When our dude is not already a favorite', () => {
      beforeEach(() => {
        component.isFavorite = false;
        fixture.detectChanges();
      });

      it('should add him into the favorite list', () => {
        component.changeFavorite();
        expect(service.addFavorite).toHaveBeenCalledWith(component.dude.name);
        expect(component.isFavorite).toBe(true);
      });
    });
  });

  describe('DOM rendering', () => {
    let dudeCardElt: HTMLElement;
    beforeEach(() => (dudeCardElt = fixture.nativeElement));

    it('should render the dude name', () => {
      const targetElt = dudeCardElt.querySelector('.dude-card-header-title');
      expect(targetElt?.textContent).toEqual(component.dude.name);
    });

    it('should render the dude role', () => {
      const targetElt = dudeCardElt.querySelector('.dude-card-content-role');
      expect(targetElt?.textContent).toEqual(component.dude.role);
    });

    it('should render the dude team', () => {
      const targetElt = dudeCardElt.querySelector('.dude-card-content-team');
      expect(targetElt?.textContent).toEqual(component.dude.team);
    });

    it('should render the dude birth year', () => {
      const targetElt = dudeCardElt.querySelector(
        '.dude-card-content-birthYear'
      );
      expect(targetElt?.textContent).toEqual(`${component.dude.birthYear}`);
    });
  });

  describe('DOM events', () => {
    describe('Favorite Button', () => {
      it('should call changeFavorite function', () => {
        const spy = jest.spyOn(component, 'changeFavorite');
        const favoriteBtn: DebugElement = fixture.debugElement.query(
          By.css('iker-button-favorite')
        );
        expect(component.isFavorite).toBe(true);

        favoriteBtn.triggerEventHandler('changeFavorite', false);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.isFavorite).toBe(false);
      });
    });
  });
});
