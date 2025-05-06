import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartProduct } from '../interfaces/cart-product.interface';
import { IndexDbService } from './index-db.service';
import { ApiUrls } from '../constants/api.urls.constants';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cart: ICartProduct[] = [];
  private cartSubject = new BehaviorSubject<ICartProduct[]>([]); // Store the products in the cart
  priceDetails = {
    totalMRP: 0,
    totalDiscount: 0,
    couponDiscount: 100,
    platformFees: 30,
    shippingFees: 20,
    totalAmount: 0
  };

  constructor(private http: HttpClient, private indexDbService: IndexDbService) {
    this.loadCartFromIndexedDB();
  }

  calculateCartSummary(items: ICartProduct[]): void {
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalDiscountedPrice = 0;

    // Iterate through each product and calculate totals
    items.forEach(product => {
      product.totalPrice = product.originalPrice * product.quantity;
      product.totalPriceAfterDiscount = product.discountedPrice * product.quantity;
      totalMRP += product.totalPrice;  // Add to Total MRP
      totalDiscount += (product.totalPrice - product.totalPriceAfterDiscount); // Add the discount amount
      totalDiscountedPrice += product.totalPriceAfterDiscount; // Add to Total Discounted Price
    });

    // Final Total amount after all discounts
    const totalAmount = totalDiscountedPrice - this.priceDetails.couponDiscount +
      this.priceDetails.platformFees + this.priceDetails.shippingFees;

    // Return the summary object
    this.priceDetails.totalAmount = totalAmount;
    this.priceDetails.totalDiscount = totalDiscount;
    this.priceDetails.totalMRP = totalMRP;
  }

  // Fetch address data from JSON file
  getAddress(): Observable<any> {
    return this.http.get(ApiUrls.urls.address);
  }

  // Fetch available offers data from JSON file
  getAvailableOffers(): Observable<any> {
    return this.http.get(ApiUrls.urls.availableOffers);
  }

  // Method to add product to cart
  addToCart(product: ICartProduct): void {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
    this.addInIndexDB(product);
  }

  // Method to get the cart count (number of items)
  getCartCount() {
    return this.cartSubject.asObservable().pipe(
      map(cart =>
        cart.reduce((acc, product) => acc + Number(product.quantity), 0) // Calculate the total count of products
      )
    );
  }

  // Method to get the cart items (product details)
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  // Load products from IndexedDB and emit them
  private loadCartFromIndexedDB(): void {
    this.indexDbService.getAllProducts()
      .then((products: ICartProduct[]) => {
        this.cartSubject.next(products);
      })
      .catch((error: Error) => {
        console.error('Error loading cart from IndexedDB', error);
      });
  }

  // Add product to the cart and store it in IndexedDB
  public addInIndexDB(product: ICartProduct): void {
    this.indexDbService.saveProduct(product)
      .then(() => {
        this.loadCartFromIndexedDB(); // Reload cart data
      })
      .catch((error: Error) => {
        console.error('Error saving product to IndexedDB', error);
      });
  }

  // Remove product from the cart and IndexedDB
  public removeProductFromIndexDB(id: string): void {
    this.indexDbService.deleteProduct(id)
      .then(() => {
        this.loadCartFromIndexedDB(); // Reload cart data after deletion
      })
      .catch((error: Error) => {
        console.error('Error removing product from IndexedDB', error);
      });
  }

  // Remove product from the cart and IndexedDB
  public updateProduct(product: ICartProduct): void {
    this.indexDbService.saveProduct(product)
      .then(() => {
        this.loadCartFromIndexedDB(); // Reload cart data after deletion
      })
      .catch((error: Error) => {
        console.error('Error removing product from IndexedDB', error);
      });
  }

  public clearRecordsFromCarts() {
    this.indexDbService.clearDB().then(() => {
      this.loadCartFromIndexedDB(); // Reload cart data after deletion
    }).catch((error: Error) => {
      console.error('Error removing products from IndexedDB', error);
    });
  }

}


