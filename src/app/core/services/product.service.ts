import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 // private apiUrl = 'https://fakestoreapi.com/products';
 
 private apiUrl = 'assets/data/products.json';  // Path to the local JSON file
 private productFilterAPIUrl = 'assets/data/product-filters.json';  // Path to the local JSON file

  constructor(private http: HttpClient) { }

  // Fetch the product data from the API
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        // Log the error to the console for debugging
        console.error('Error fetching products', error);

        // Return a fallback observable with an empty array or custom error message
        return of([]); // Or you can return an error message here
      })
    );
  }

  getProductDetail(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`).pipe(
      catchError(error => {
        console.error('Error fetching product data', error);
         // Return a fallback observable with an empty array or custom error message
         return of([]); // Or you can return an error message here
      })
    );
  }

  getProductFilters(): Observable<any> {
    return this.http.get<any>(`${this.productFilterAPIUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching product data', error);
         // Return a fallback observable with an empty array or custom error message
         return of([]); // Or you can return an error message here
      })
    );
  }
  
}