export interface ShippingDetails {
    free_shipping: boolean;
    estimated_delivery: string;
  }
  
  export interface Options {
    gift_wrapping: boolean;
    personalization: boolean;
  }
  
  export interface SellerDetails {
    seller_name: string;
    seller_rating: number;
    contact: string;
    location: string;
  }
  
  export interface IProductDetails {
    product_id: string;
    title: string;
    description: string;
    material: string;
    available_sizes: string[];
    available_colors: string[];
    original_price: number;
    discount_percentage: number;
    price_after_discount: number;
    stock_quantity: number;
    brand: string;
    rating: number;
    reviews_count: number;
    is_on_sale: boolean;
    images: string[];
    product_url: string;
    category: string;
    shipping_details: ShippingDetails;
    options: Options;
    seller_details: SellerDetails;
  }
  