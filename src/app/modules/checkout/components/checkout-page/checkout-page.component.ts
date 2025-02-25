import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base.components';
import { ICartProduct } from 'src/app/core/interfaces/cart-product.interface';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent extends BaseComponent {
  address: any;
  availableOffers: any;
  cartItems: ICartProduct[] = [];
  priceDetails = {
    totalMRP: 1300,
    totalDiscount: 150,
    couponDiscount: 100,
    platformFees: 50,
    shippingFees: 40,
    totalAmount: 1140
  };

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
      this.calculateCartSummary();
    });
  }

  calculateCartSummary(): any {
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalDiscountedPrice = 0;

    // Iterate through each product and calculate totals
    this.cartItems.forEach(product => {
      totalMRP += product.originalPrice;  // Add to Total MRP
      totalDiscount += (product.originalPrice - product.discountedPrice); // Add the discount amount
      totalDiscountedPrice += product.discountedPrice; // Add to Total Discounted Price
    });

    // Final Total amount after all discounts
    const totalAmount = totalDiscountedPrice;

    // Return the summary object
    this.priceDetails.totalAmount = totalAmount;
    this.priceDetails.totalDiscount = totalDiscount;
    this.priceDetails.totalMRP = totalMRP;
  }


  // Calculate the total price for a product
  getTotalPrice(product: any): number {
    return product.price * product.quantity;
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
    this.navigateTo('/home');
  }
}
