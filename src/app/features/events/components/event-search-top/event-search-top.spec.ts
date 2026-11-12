import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSearchTop } from './event-search-top';

describe('EventSearch', () => {
  let component: EventSearchTop;
  let fixture: ComponentFixture<EventSearchTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSearchTop],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSearchTop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
