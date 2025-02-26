export interface ICartProduct {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  totalPrice: number; // based on quantity selected
  totalPriceAfterDiscount: number // based on quantity selected
  image: string;
}