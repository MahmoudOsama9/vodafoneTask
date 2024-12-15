import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTempCardComponent } from './top-temp-card.component';

describe('TopTempCardComponent', () => {
  let component: TopTempCardComponent;
  let fixture: ComponentFixture<TopTempCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTempCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopTempCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
