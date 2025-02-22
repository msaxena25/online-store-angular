import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { IProductDetails } from '../../../../core/interfaces/product-details.interface';
import { BaseComponent } from '../../../../core/components/base.components';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent extends BaseComponent {
  product: IProductDetails | null = null;
  errorMessage = '';

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    const productId = this.getRouteParam('id');
    if (productId) {
      this.productService.getProductDetail(+productId).subscribe(product => {
        console.log("👉  product id:", productId);
        this.product = product;
      });
    }
    // this.productService.getProductById(productId).subscribe(product => {
    //   console.log("👉  product:", product);
    //   this.product = product;
    // });

  }

  addToCart() {
    this.navigateTo('checkout')
  }

}
