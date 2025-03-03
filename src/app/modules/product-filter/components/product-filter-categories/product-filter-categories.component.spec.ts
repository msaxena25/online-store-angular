import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterCategoriesComponent } from './product-filter-categories.component';

describe('ProductFilterCategoriesComponent', () => {
  let component: ProductFilterCategoriesComponent;
  let fixture: ComponentFixture<ProductFilterCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
