import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { IProductFilter, FilterOption } from '../../interfaces/product-filter.interface'; // Import model

@Component({
  selector: 'app-product-filter-page',
  templateUrl: './product-filter-page.component.html',
  styleUrls: ['./product-filter-page.component.scss']
})
export class ProductFilterPageComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();  // Event emitter to send filter data
  filterOptions: IProductFilter | null = null;  // Store the filter options
  selectedCategories: number[] = [];
  selectedColors: number[] = [];
  selectedDiscounts: number[] = [];
  selectedPriceRange: number = 100;
  productName: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    this.productService.getProductFilters().subscribe({
      next: (data) => {
        this.filterOptions = data;  // Handle successful response
      },
      error: (error) => {
        console.error('Error loading filter options:', error);  // Handle error
      }
    }

    );
  }

  onCategoryChange(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  onColorChange(colorId: number): void {
    const index = this.selectedColors.indexOf(colorId);
    if (index === -1) {
      this.selectedColors.push(colorId);
    } else {
      this.selectedColors.splice(index, 1);
    }
  }

  onDiscountChange(discountId: number): void {
    const index = this.selectedDiscounts.indexOf(discountId);
    if (index === -1) {
      this.selectedDiscounts.push(discountId);
    } else {
      this.selectedDiscounts.splice(index, 1);
    }
  }

  onPriceRangeChange(value: number): void {
    this.selectedPriceRange = value;
  }

  resetFilters(): void {
    this.selectedCategories = [];
    this.selectedColors = [];
    this.selectedDiscounts = [];
    this.selectedPriceRange = 100;
  }

  // This will be used to emit the filter values to parent component
  applyFilters() {
    this.filterChange.emit({
      categories: this.selectedCategories,
      productName: this.productName,
      selectedPrice: this.selectedPriceRange,
      discounts: this.selectedDiscounts,
      color: this.selectedColors
    });
  }
}
