export interface PriceRange {
    min: number;
    max: number;
    step: number;
}

export interface FilterOption {
    id: number;
    name: string;
}

export interface IProductFilter {
    categories: FilterOption[];
    colors: FilterOption[];
    discounts: FilterOption[];
    priceRange: PriceRange;
}

export interface IFilterState {
    categories?: number[]; // Array of category IDs
    productName?: string;  // Product name (could be empty string)
    selectedPrice?: number; // Selected price value
    discounts?: number[];     // Array to hold discount data (use a specific type if you know the shape of discounts)
    colors?: number[];        // Array to hold color data (use a specific type if you know the shape of colors)
  }