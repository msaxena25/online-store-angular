import { ProductService } from '../../app/core/services/product.service';
import { ProductFilterService } from '../../app/core/services/product-filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteSpy, productFilterServiceSpy, productServiceSpy, routerSpy } from '../../app/test-utils/service.mock';

export const productListComponentProviders = [
    { provide: ProductService, useValue: productServiceSpy },
    { provide: ProductFilterService, useValue: productFilterServiceSpy },
    { provide: Router, useValue: routerSpy },
     { provide: ActivatedRoute, useValue: activatedRouteSpy }
];
