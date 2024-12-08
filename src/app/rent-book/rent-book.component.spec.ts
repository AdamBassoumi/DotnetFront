import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBookComponent } from './rent-book.component';

describe('RentBookComponent', () => {
  let component: RentBookComponent;
  let fixture: ComponentFixture<RentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
