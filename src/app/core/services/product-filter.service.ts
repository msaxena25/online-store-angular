import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilterState, IProductFilter } from '../interfaces/product-filter.interface';

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
}
