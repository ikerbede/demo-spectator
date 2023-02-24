import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DudeCardComponent } from './dude-card.component';

describe('DudeCardComponent', () => {
  let component: DudeCardComponent;
  let fixture: ComponentFixture<DudeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DudeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DudeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
