import { Component } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base.components';
import { RouteUrls } from '../../../../core/constants/route.urls.constants';
import { ICartProduct } from '../../../../core/interfaces/cart-product.interface';
import { CheckoutService } from '../../../../core/services/checkout.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent extends BaseComponent {
  address: any;
  availableOffers: any;
  cartItems: ICartProduct[] = [];
  priceDetails = this.checkoutService.priceDetails;

  constructor(private checkoutService: CheckoutService) { super() }

  ngOnInit(): void {
    this.loadAddress();
    this.loadOffers();
    this.getAddedCartProduct();
  }

  private getAddedCartProduct() {
    // Subscribe to cart items to get product details
    this.checkoutService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.checkoutService.calculateCartSummary(items);
    });
  }

  private loadOffers() {
    const sub$ = this.checkoutService.getAvailableOffers().subscribe(data => {
      this.availableOffers = data.offers;
    });
    this.addSub(sub$);
  }

  private loadAddress() {
    // Load address and available offers from service
    const addressSub$ = this.checkoutService.getAddress().subscribe(data => {
      this.address = data.address;
    });
    this.addSub(addressSub$);
  }

  addProduct() {
    this.navigateTo(RouteUrls.route.productList);
  }

  onRemoveProductFromCart(productId: string) {
    this.checkoutService.removeProductFromIndexDB(productId);

  }

  // Method to handle quantity change
  onQuantityChange(event: any, product: ICartProduct): void {
    const selectedQuantity = event.target.value;
    product.quantity = selectedQuantity;
    this.checkoutService.updateProduct(product)
  }

  onPlaceOrdder() {
    this.checkoutService.clearRecordsFromCarts();
    this.navigateTo(RouteUrls.route.acknowledge);
  }
}
