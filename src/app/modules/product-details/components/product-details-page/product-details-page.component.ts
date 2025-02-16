import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent {
  product: any;
  errorMessage = '';

  constructor(private productService: ProductService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('detail page')
    const productId = +this.route.snapshot.paramMap.get('id')!; 
    this.productService.getProductDetail(1).subscribe({
      next: (data) => {
        this.product = data;  // Success handler: assign data to product
      },
      error: (err) => {
        this.errorMessage = 'There was an error fetching the product details.';
        console.error('Error fetching product data:', err);  // Error handler
      },
      complete: () => {
        console.log('Product fetch completed');  // Optional: handle completion if needed
      }
    });
  }

  addToCart() {
    console.log('Product added to cart');
  }

}
