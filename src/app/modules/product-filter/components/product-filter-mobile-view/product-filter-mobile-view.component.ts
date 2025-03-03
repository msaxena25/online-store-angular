import { Component, ViewChild } from '@angular/core';
import { ProductFilterCategoriesComponent } from '../product-filter-categories/product-filter-categories.component';

@Component({
  selector: 'app-product-filter-mobile-view',
  templateUrl: './product-filter-mobile-view.component.html',
  styleUrls: ['./product-filter-mobile-view.component.scss']
})
export class ProductFilterMobileViewComponent {
  @ViewChild('productFilterCategories') productFilterCategoriesComponent: ProductFilterCategoriesComponent;

  isVisible = false;
  filters = {
    category: '',
    price: 0
  };

  // Show the overlay
  openOverlay() {
    this.isVisible = true;
  }

  // Hide the overlay
  closeOverlay() {
    this.isVisible = false;
  }

  // Clear all filters
  clearFilters() {
    this.filters = {
      category: '',
      price: 0
    };
  }

  applyFilters() {
    this.productFilterCategoriesComponent.applyFilters();
    this.closeOverlay();
  }

  resetFilters() {
    this.productFilterCategoriesComponent.resetFilters();

  }
}
