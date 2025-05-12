import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPageComponent } from './product-list-page.component';
import { productListComponentProviders } from '@app-test-utils/providers.mock';
import { configureTestBed } from '@app-test-utils/testbed-setup';
import { productFilterServiceSpy, productServiceSpy } from '@app-test-utils/service.mock';
import { mockProducts } from '@app-test-utils/data.mock';
import { of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;

  beforeEach(async () => {
    productServiceSpy.loadProducts.and.returnValue(of(mockProducts));
    const setup = await configureTestBed(ProductListPageComponent,
      {
        providers: productListComponentProviders
      }
    )
    fixture = setup.fixture;
    component = setup.component;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products successfully and initialize filteredProducts', () => {
    spyOn(component as any, 'getQueryParam').and.returnValue(null);
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.errorMessage).toBeNull();
    expect(productServiceSpy.setProducts).toHaveBeenCalledWith(mockProducts);
  });

  it('should load products and apply search text coming from Home page', () => {
    spyOn(component as any, 'getQueryParam').and.returnValue({ search: 'Product' });
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.filteredProducts.length).toEqual(0);
    expect(component.errorMessage).toBeNull();
  });


  it('should handle empty products response', () => {
    productServiceSpy.loadProducts.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('No products available.');
  });

  it('should handle API error response', () => {
    productServiceSpy.loadProducts.and.returnValue(throwError(() => new Error('API error')));
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Something went wrong. Please try again later.');
  });

  it('should apply filters and set filteredProducts on filter change', () => {
    component.products = mockProducts;
    const filtered = [mockProducts[1]];
    productFilterServiceSpy.applyFilters.and.returnValue(filtered);
    component.listenFilterChange();
    (productFilterServiceSpy.filterChanged$ as Subject<any>).next({ productName: 'B' });

    expect(component.filteredProducts).toEqual(filtered);
    expect(component.errorMessage).toBe('');
  });

  it('should show error message if no products match the filter', () => {
    component.products = mockProducts;
    productFilterServiceSpy.applyFilters.and.returnValue([]);
    component.listenFilterChange();
    (productFilterServiceSpy.filterChanged$ as Subject<any>).next({ productName: 'Z' });

    expect(component.filteredProducts).toEqual([]);
    expect(component.errorMessage).toBe('No products available.');
  });

  it('should reset filters and show all products', () => {
    component.products = mockProducts;
    component.resetFilters();
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(productFilterServiceSpy.resetFilters).toHaveBeenCalled();
  });

  it('should navigate to product detail page', () => {
    const router = TestBed.inject(Router);
    component.viewProductDetail(1);
    expect(router.navigate).toHaveBeenCalledWith(['product/1']);
  });

  it('should call openOverlay on floating icon click', () => {
    component.productFilterMobileViewOverlay = jasmine.createSpyObj('ProductFilterMobileViewComponent', ['openOverlay']);
    component.onFloatingIconClick();
    expect(component.productFilterMobileViewOverlay.openOverlay).toHaveBeenCalled();
  });
});
