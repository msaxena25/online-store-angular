import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent {

  // Observable for products
  products$ = this.productService.getProducts();

  // Variable to track loading status
  loading = true;

  // Variable to hold any error messages
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the observable and handle success/error in the component
    this.products$.subscribe({
      next: (products) => {
        // If products are fetched, stop loading and clear any error message
        this.loading = false;
        if (products.length === 0) {
          this.errorMessage = 'No products available.';
        } else {
          this.errorMessage = null;
        }
      },
      error: (err) => {
        // In case of an error, show the error message
        this.loading = false;
        this.errorMessage = 'Something went wrong. Please try again later.';
        console.error('Error fetching products', err);
      }
    });
  }

  viewProductDetail(id: string): void {
    console.log('hello')
    this.router.navigate(['/product']);
    // Navigate to the product detail page with the product ID
  }

  onFilterChange(filters: any): void {
    // this.filteredProducts = this.products.filter(product => {
    //   // Apply the filter logic
    //   return (
    //     (filters.category ? product.category === filters.category : true) &&
    //     (filters.productName ? product.title.toLowerCase().includes(filters.productName.toLowerCase()) : true) &&
    //     (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
    //     (filters.discount ? (product.price * (1 - product.discount / 100)) <= product.price : true) &&
    //     (filters.color ? product.color === filters.color : true)
    //   );
    // });
  }
}
