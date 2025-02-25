import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IProduct } from '../interfaces/product.interface';
import { IProductDetails } from '../interfaces/product-details.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  // private apiUrl = 'https://fakestoreapi.com/products';

  private apiUrl = 'assets/data/products.json';  // Path to the local JSON file
  private productDetailApiUrl = 'assets/data/product-detail.json';  // Path to the local JSON file

  constructor(private http: HttpClient) { }

  // Method to set products data from outside
  setProducts(products: IProduct[]): void {
    this.productsSubject.next(products);  // Updating the product list
  }

  // Method to get the products observable
  getProducts() {
    return this.productsSubject.asObservable();  // Return the observable of product list
  }

  // Method to get product by ID
  getProductById(productId: number): Observable<IProduct | null> {
    let result: IProduct | null = null;

    // Check if products are available, otherwise load from JSON or API
    if (this.productsSubject.value.length === 0) {
      return this.loadProducts().pipe(
        switchMap((data) => {
          result = data.find(p => p.id === productId) || null;
          return new Observable<IProduct | null>((observer) => {
            observer.next(result);
            observer.complete();
          });
        })
      );
    } else {
      result = this.productsSubject.value.find(p => p.id === productId) || null;
      return new Observable(observer => {
        observer.next(result);  // Emit a single product or null
        observer.complete();
      });
    }
  }

  // Fetch the product data from the API
  loadProducts(): Observable<IProduct[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        // Log the error to the console for debugging
        console.error('Error fetching products', error);
        return of([]);
      })
    );
  }

  getProductDetail(productId: number): Observable<IProductDetails[]> {
    return this.http.get<any>(`${this.productDetailApiUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching product data', error);
        // Return a fallback observable with an empty array or custom error message
        return of([]);
      })
    );
  }

}