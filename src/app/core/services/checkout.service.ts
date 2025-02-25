import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartProduct } from '../interfaces/cart-product.interface';
import { IndexDbService } from './index-db.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cart: ICartProduct[] = [];
  private cartSubject = new BehaviorSubject<ICartProduct[]>([]); // Store the products in the cart

  constructor(private http: HttpClient, private indexDbService: IndexDbService) {
    this.loadCartFromIndexedDB();
   }

  // Fetch address data from JSON file
  getAddress(): Observable<any> {
    return this.http.get('assets/data/address.json');
  }

  // Fetch available offers data from JSON file
  getAvailableOffers(): Observable<any> {
    return this.http.get('assets/data/available-offers.json');
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
        cart.reduce((acc, product) => acc + product.quantity, 0) // Calculate the total count of products
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
        console.log("👉 products:", products);
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
  public removeProductFromIndexDB(id: number): void {
    this.indexDbService.deleteProduct(id)
      .then(() => {
        this.loadCartFromIndexedDB(); // Reload cart data after deletion
      })
      .catch((error: Error) => {
        console.error('Error removing product from IndexedDB', error);
      });
  }

}


