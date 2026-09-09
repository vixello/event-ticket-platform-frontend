import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketSelector } from './ticket-selector';

describe('TicketSelector', () => {
  let component: TicketSelector;
  let fixture: ComponentFixture<TicketSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
