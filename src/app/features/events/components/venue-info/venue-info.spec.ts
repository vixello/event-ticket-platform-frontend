import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueInfo } from './venue-info';

describe('VenueInfo', () => {
  let component: VenueInfo;
  let fixture: ComponentFixture<VenueInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
