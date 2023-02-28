import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { DudeCardComponent } from './dude-card/dude-card.component';
import { DudesService } from './shared/dudes.service';
import { DUDES } from './shared/dudes.constant';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: DudesService;

  const dudesServiceMock: Partial<DudesService> = {
    getDudes: jest.fn().mockReturnValue(DUDES),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent(DudeCardComponent)],
      providers: [{ provide: DudesService, useValue: dudesServiceMock }],
    }).compileComponents();

    service = TestBed.inject(DudesService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should get the dudes from te service`, () => {
    fixture.detectChanges();
    expect(service.getDudes).toHaveBeenCalledTimes(1);
    expect(component.dudes).toEqual(DUDES);
  });

  it('should render the dudes', () => {
    fixture.detectChanges();
    const dudes: NodeList =
      fixture.nativeElement.querySelectorAll('iker-dude-card');
    expect(dudes.length).toEqual(DUDES.length);
  });
});
