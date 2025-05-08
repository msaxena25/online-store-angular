import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilterState, IProductFilter } from '../interfaces/product-filter.interface';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private filterOptionsUrl = 'assets/data/product-filters.json';
  private filterSubject = new BehaviorSubject<IFilterState>({});  // Subject to emit filter changes
  filterChanged$ = this.filterSubject.asObservable();  // Observable to listen to filter changes

  constructor(private http: HttpClient) { }

  // Get filter options from JSON file
  getProductFilterOptions() {
    return this.http.get<IProductFilter>(this.filterOptionsUrl);
  }

  // Emit the filter data to the subscribers (e.g., ProductListComponent)
  updateFilter(filterData: any) {
    this.filterSubject.next(filterData);  // Emit filter data
  }

  resetFilters() {
    this.filterSubject.next({
      categories: [],
      colors: [],
      discounts: [],
      selectedPrice: 100
    });
  }
  applyFilters(filterData: IFilterState, products: IProduct[]): IProduct[] {
    const filteredProducts = products.filter(product => {
      const isCategoryMatch =
        !filterData.categories || filterData.categories.length === 0 || filterData.categories.includes(product.categoryId);

      const isColorMatch =
        !filterData.colors || filterData.colors.length === 0 || filterData.colors.includes(product.colorId);

      const isDiscountMatch =
        !filterData.discounts || filterData.discounts.length === 0 || product.discount >= Math.min(...filterData.discounts || []);

      const isPriceInRange = product.price <= (filterData.selectedPrice || Infinity); // If no price selected, allow all

      const isProductName =
        product.title.toLowerCase().includes((filterData.productName || '').toLowerCase());

      return isCategoryMatch && isColorMatch && isDiscountMatch && isPriceInRange && isProductName;
    });

    return filteredProducts;
  }

}
