import { IProduct } from '@app-core/interfaces/product.interface';
import productDetailsData from '../../assets/data/product-detail.json';

export const mockProducts = [
    { id: 1, title: 'Product A', price: 100 },
    { id: 2, title: 'Product B', price: 200 }
] as IProduct[];

export const mockProductDetails = productDetailsData;