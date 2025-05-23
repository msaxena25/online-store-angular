import { Component, ViewChild } from '@angular/core';
import { ProductService } from '@app-core/services/product/product.service';
import { IProduct } from '@app-core/interfaces/product.interface';
import { BaseComponent } from '@app-core/components/base.components';
import { RouteUrls } from '@app-core/constants/route.urls.constants';
import { ProductFilterMobileViewComponent } from '../../../../modules/product-filter/components/product-filter-mobile-view/product-filter-mobile-view.component';
import { ProductFilterService } from '@app-core/services/product-filter/product-filter.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent extends BaseComponent {
  @ViewChild('productFilterMobileViewOverlay') productFilterMobileViewOverlay: ProductFilterMobileViewComponent;
  products: IProduct[] = [];  // List of products
  filteredProducts: IProduct[] = [];  // Filtered products based on the applied filters

  // Variable to track loading status
  loading = true;

  // Variable to hold any error messages
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private filterService: ProductFilterService) { super() }

  ngOnInit(): void {
    this.loadProductsFromApi();
    this.listenFilterChange();

  }

  loadProductsFromApi() {
    // Subscribe to the observable and handle success/error in the component
    this.productService.loadProducts().subscribe({
      next: (products) => {
        // If products are fetched, stop loading and clear any error message
        this.loading = false;
        if (products.length === 0) {
          this.errorMessage = 'No products available.';
        } else {
          this.laodProductsSuccess(products);
        }
      },
      error: () => {
        this.loaderService.hide();
        // In case of an error, show the error message
        this.loading = false;
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    });
  }

  private laodProductsSuccess(products: IProduct[]) {
    this.errorMessage = null;
    this.products = products;
    this.productService.setProducts(products);
    const searchText = this.getQueryParam('search');
    if (searchText) {
      this.filterService.updateFilter({ productName: searchText });
    } else {
      this.filteredProducts = products; // Set initial products list
    }

  }

  listenFilterChange() {
    // Listen to filter changes from the ProductFilterComponent
    const sub$ = this.filterService.filterChanged$.subscribe(filterData => {
      this.errorMessage = '';
      if (this.products.length) {
        this.filteredProducts = this.filterService.applyFilters(filterData, this.products);
        if (this.filteredProducts.length === 0) {
          this.errorMessage = 'No products available.';
        }
      }

    });
    this.subscriptions$.add(sub$);
  }

  viewProductDetail(id: number): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
      this.navigateTo(`${RouteUrls.route.product}/${id}`);
    }, 500);

  }


  // Reset filters and show all products
  resetFilters(): void {
    // Notify filter component to reset
    this.filterService.resetFilters();

    // Show all products
    this.filteredProducts = [...this.products];
  }

  onFloatingIconClick() {
    this.productFilterMobileViewOverlay.openOverlay();
  }

}
