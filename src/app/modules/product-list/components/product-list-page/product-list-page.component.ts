import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { ProductFilterService } from '../../../../core/services/product-filter.service';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { BaseComponent } from '../../../../core/components/base.components';
import { RouteUrls } from 'src/app/core/constants/route.urls.constants';
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent extends BaseComponent {
  products: IProduct[] = [];  // List of products
  filteredProducts: IProduct[] = [];  // Filtered products based on the applied filters
  // Observable for products
  products$ = this.productService.loadProducts();

  // Variable to track loading status
  loading = true;

  // Variable to hold any error messages
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private filterService: ProductFilterService) { super() }

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
          this.products = products;
          this.productService.setProducts(products);
          this.filteredProducts = products; // Set initial products list
        }
      },
      error: (err) => {
        // In case of an error, show the error message
        this.loading = false;
        this.errorMessage = 'Something went wrong. Please try again later.';
        console.error('Error fetching products', err);
      }
    });
    // Listen to filter changes from the ProductFilterComponent
    const sub$ = this.filterService.filterChanged$.subscribe(filterData => {
      this.applyFilters(filterData);
    });
    this.subscriptions$.add(sub$);
  }

  viewProductDetail(id: number): void {
    this.navigateTo(`${RouteUrls.route.product}/${id}`);
    // Navigate to the product detail page with the product ID
  }

  // Method to apply filters on the products
  applyFilters(filterData: any): void {
    this.errorMessage = null;
    this.filteredProducts = this.products.filter(product => {
      const isCategoryMatch = filterData.categories.length === 0 || filterData.categories.includes(product.categoryId);
      const isColorMatch = filterData.colors.length === 0 || filterData.colors.includes(product.colorId);
      const isDiscountMatch = filterData.discounts.length === 0 || product.discount >= Math.min(...filterData.discounts);
      const isPriceInRange = product.price >= filterData.selectedPrice;

      return isCategoryMatch && isColorMatch && isDiscountMatch && isPriceInRange;
    });

    if (this.filteredProducts.length === 0) {
      this.errorMessage = 'No products available.';
    }
  }
  // Reset filters and show all products
  resetFilters(): void {
    // Notify filter component to reset
    this.filterService.resetFilters();

    // Show all products
    this.filteredProducts = [...this.products];
  }
}
