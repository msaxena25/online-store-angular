import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgmentPageComponent } from './acknowledgment-page.component';

describe('AcknowledgmentPageComponent', () => {
  let component: AcknowledgmentPageComponent;
  let fixture: ComponentFixture<AcknowledgmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcknowledgmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcknowledgmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
