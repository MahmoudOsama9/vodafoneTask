import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowTempCardComponent } from './low-temp-card.component';

describe('LowTempCardComponent', () => {
  let component: LowTempCardComponent;
  let fixture: ComponentFixture<LowTempCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowTempCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LowTempCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
