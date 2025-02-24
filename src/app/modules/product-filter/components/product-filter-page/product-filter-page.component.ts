import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProductFilter } from '../../../../core/interfaces/product-filter.interface'; // Import model
import { ProductFilterService } from '../../../../core/services/product-filter.service';

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

  constructor(private productFilterService: ProductFilterService) { }

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    this.productFilterService.getProductFilterOptions().subscribe({
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
    // Emit reset filters event to parent component
    this.productFilterService.updateFilter({
      categories: [],
      colors: [],
      discounts: [],
      selectedPrice: 100
    });
  }

  applyFilters() {
    const filterData = {
      categories: this.selectedCategories,
      productName: this.productName,
      selectedPrice: this.selectedPriceRange,
      discounts: this.selectedDiscounts,
      colors: this.selectedColors
    };
    this.productFilterService.updateFilter(filterData);  // Update filters in the service
  }
}
