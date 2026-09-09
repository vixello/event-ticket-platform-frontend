import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventHeader } from './event-header';

describe('EventHeader', () => {
  let component: EventHeader;
  let fixture: ComponentFixture<EventHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(EventHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
