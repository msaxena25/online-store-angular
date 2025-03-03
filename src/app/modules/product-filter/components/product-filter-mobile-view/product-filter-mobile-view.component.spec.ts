import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterMobileViewComponent } from './product-filter-mobile-view.component';

describe('ProductFilterMobileViewComponent', () => {
  let component: ProductFilterMobileViewComponent;
  let fixture: ComponentFixture<ProductFilterMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterMobileViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
