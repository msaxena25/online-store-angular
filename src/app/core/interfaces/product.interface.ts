export interface IProduct {
    id: number;              // Unique ID of the product
    title: string;           // Product title
    description: string;     // Product description
    price: number;           // Product price (in Rupees)
    discount: number;        // Discount on the product (in percentage)
    category: string;        // category name
    categoryId: number;      // Category ID of the product
    color: string;         // Color of the product
    colorId: number;         // Color ID of the product
    image: string;        // URL of the product image
    rating: {
        rate: number;          // Rating of the product
        count: number;         // Number of reviews for the product
    };
}
