import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterPageComponent } from './product-filter-page.component';

describe('ProductFilterPageComponent', () => {
  let component: ProductFilterPageComponent;
  let fixture: ComponentFixture<ProductFilterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
