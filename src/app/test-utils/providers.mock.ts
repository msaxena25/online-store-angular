import { ProductService } from '@app-core/services/product.service';
import { ProductFilterService } from '@app-core/services/product-filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteSpy, checkoutServiceSpy, productFilterServiceSpy, productServiceSpy, routerSpy } from '@app-test-utils/service.mock';
import { CheckoutService } from '@app-core/services/checkout.service';

const mocks = {
    productService: { provide: ProductService, useValue: productServiceSpy },
    router: { provide: Router, useValue: routerSpy },
    activatedRoute: { provide: ActivatedRoute, useValue: activatedRouteSpy },
    filterService: { provide: ProductFilterService, useValue: productFilterServiceSpy },
    checkoutService: { provide: CheckoutService, useValue: checkoutServiceSpy }
}

export const productListComponentProviders = [
    mocks.productService, mocks.filterService, mocks.router, mocks.activatedRoute
];

export const productDetailsPageComponentProviders = [
    mocks.productService, mocks.router, mocks.activatedRoute, mocks.checkoutService
];