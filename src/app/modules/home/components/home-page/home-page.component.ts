import { Component } from '@angular/core';

import { BaseComponent } from '../../../../core/components/base.components';
import { RouteUrls } from '../../../../core/constants/route.urls.constants';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BaseComponent {

  imageBasePath: string = 'assets/images/';

  carouselImages: string[] = [
    this.imageBasePath + 'carousel1.png',
    this.imageBasePath + 'carousel2.png',
    this.imageBasePath + 'carousel3.png'
  ];

  shopByCategoryImage: string = this.imageBasePath + 'shopbycat.jpg';

  shoppingCategories: { image: string; }[][] = [
    [
      { image: this.imageBasePath + 'sale4.png' },
      { image: this.imageBasePath + 'sale2.png' },
      { image: this.imageBasePath + 'sale3.png' }
    ],
    [
      { image: this.imageBasePath + 'sale4.png' },
      { image: this.imageBasePath + 'sale2.png' },
      { image: this.imageBasePath + 'sale3.png' }
    ]
  ];

  flatDiscountImage: string = this.imageBasePath + 'flat-discount.jpg';

  navigateToProduct() {
    this.navigateTo(RouteUrls.route.productList);
  }
}
