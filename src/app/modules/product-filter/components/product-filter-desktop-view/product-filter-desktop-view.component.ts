import { Component, ViewChild } from '@angular/core';
import { ProductFilterCategoriesComponent } from '../product-filter-categories/product-filter-categories.component';

@Component({
  selector: 'app-product-filter-desktop-view',
  templateUrl: './product-filter-desktop-view.component.html',
  styleUrls: ['./product-filter-desktop-view.component.scss']
})
export class ProductFilterDesktopViewComponent {
  @ViewChild('productFilterCategories') productFilterCategoriesComponent: ProductFilterCategoriesComponent;
  applyFilters() {
    this.productFilterCategoriesComponent.applyFilters();
  }

  resetFilters() {
    this.productFilterCategoriesComponent.resetFilters();

  }
}
