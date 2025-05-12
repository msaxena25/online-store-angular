import { ComponentFixture } from '@angular/core/testing';

import { ProductDetailsPageComponent } from './product-details-page.component';
import { configureTestBed } from './../../../../test-utils/testbed-setup';
import { productDetailsPageComponentProviders } from './../../../../test-utils/providers.mock';
import { checkoutServiceSpy, productServiceSpy, routerSpy } from './../../../../test-utils/service.mock';
import { of } from 'rxjs';
import { mockProductDetails } from './../../../../test-utils/data.mock';
import { RouteUrls } from '../../../../core/constants/route.urls.constants';

describe('ProductDetailsPageComponent', () => {
  let component: ProductDetailsPageComponent;
  let fixture: ComponentFixture<ProductDetailsPageComponent>;

  beforeEach(async () => {
    productServiceSpy.getProductDetail.and.returnValue(of(mockProductDetails));
    const setup = await configureTestBed(ProductDetailsPageComponent,
      {
        providers: productDetailsPageComponentProviders
      }
    )
    fixture = setup.fixture;
    component = setup.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product detail and assign product based on route param', () => {
    spyOn(component, 'getRouteParam').and.returnValue('1');
    component.ngOnInit();
    expect(productServiceSpy.getProductDetail).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProductDetails[0]);
  });

  it('should call checkoutService.addToCart with correct product data', () => {
    component.product = mockProductDetails[0];
    component.addToCart();
    expect(checkoutServiceSpy.addToCart).toHaveBeenCalled();
    expect(component.productAddedInCart).toBeTrue();
  });
  it('should navigate to checkout route', () => {
    component.goToBag();
    expect(routerSpy.navigate).toHaveBeenCalledWith([RouteUrls.route.checkout]);
  });
});
