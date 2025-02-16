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
