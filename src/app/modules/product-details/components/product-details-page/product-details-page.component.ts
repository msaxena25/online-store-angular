import { Component } from '@angular/core';
import { ProductService } from '@app-core/services/product.service';
import { IProductDetails } from '@app-core/interfaces/product-details.interface';
import { BaseComponent } from '@app-core/components/base.components';
import { CheckoutService } from '@app-core/services/checkout.service';
import { ICartProduct } from '@app-core/interfaces/cart-product.interface';
import { RouteUrls } from '@app-core/constants/route.urls.constants';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent extends BaseComponent {
  product: IProductDetails | null = null;
  errorMessage = '';
  productAddedInCart = false;

  constructor(private productService: ProductService, private checkoutService: CheckoutService) {
    super();
  }

  ngOnInit(): void {
    const productId = this.getRouteParam('id');
    if (productId) {
      this.productService.getProductDetail(+productId).subscribe((product: IProductDetails[]) => {
        this.product = product.find((item: IProductDetails) => item.product_id === productId) || product[0];
      });
    }

  }

  addToCart() {
    const p = {
      id: this.product?.product_id,
      title: this.product?.title,
      category: this.product?.category,
      originalPrice: this.product?.original_price,
      discountedPrice: this.product?.price_after_discount,
      totalPrice: this.product?.original_price,
      totalPriceAfterDiscount: this.product?.price_after_discount,
      quantity: 1,
      image: this.product?.images[0]
    } as ICartProduct;
    this.checkoutService.addToCart(p); // will add only required props
    this.productAddedInCart = true;
  }

  goToBag() {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
      this.navigateTo(RouteUrls.route.checkout);
    }, 500);
  
  }

}
