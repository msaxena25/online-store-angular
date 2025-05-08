import { Component } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base.components';
import { IFilterState, IProductFilter } from '../../../../core/interfaces/product-filter.interface';
import { ProductFilterService } from '../../../../core/services/product-filter.service';

@Component({
  selector: 'app-product-filter-categories',
  templateUrl: './product-filter-categories.component.html',
  styleUrls: ['./product-filter-categories.component.scss']
})
export class ProductFilterCategoriesComponent extends BaseComponent {
  filterOptions: IProductFilter | null = null;  // Store the filter options
  filterState: IFilterState = {};
  selectedCategories: number[] = [];
  selectedColors: number[] = [];
  selectedDiscounts: number[] = [];
  selectedPriceRange: number = 5000;
  productName: string = '';

  constructor(private productFilterService: ProductFilterService) { super() }

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    this.productFilterService.getProductFilterOptions().subscribe({
      next: (data) => {
        this.filterOptions = data;  // Handle successful response
        this.loadFilterState();
      },
      error: (error) => {
        console.error('Error loading filter options:', error);  // Handle error
      }
    }
    );
  
  }

  loadFilterState() {
    // Listen to filter changes from the ProductFilterComponent
    const sub$ = this.productFilterService.filterChanged$.subscribe(filterData => {
      this.filterState = filterData;
      this.selectedCategories = this.filterState.categories || [];
      this.selectedColors = this.filterState.colors || [];
      this.selectedDiscounts = this.filterState.discounts || [];
      this.productName = this.filterState.productName || '';
      
    });

    this.subscriptions$.add(sub$);
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
    this.selectedPriceRange = 5000;
    // Emit reset filters event to parent component
    this.productFilterService.updateFilter({
      categories: [],
      colors: [],
      discounts: [],
      selectedPrice: 5000
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
