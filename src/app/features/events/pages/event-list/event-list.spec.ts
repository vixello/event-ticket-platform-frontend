import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventList } from './event-list';
import { EventSearch } from '../../components/event-search/event-search';
import { EventFilters } from '../../components/event-filters/event-filters';
import { EventGrid } from '../../components/event-grid/event-grid';

describe('EventList', () => {
  let component: EventList;
  let fixture: ComponentFixture<EventList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventList, EventSearch, EventFilters, EventGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(EventList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
