import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterDesktopViewComponent } from './product-filter-desktop-view.component';

describe('ProductFilterDesktopViewComponent', () => {
  let component: ProductFilterDesktopViewComponent;
  let fixture: ComponentFixture<ProductFilterDesktopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterDesktopViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterDesktopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
