import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';


@NgModule({
  declarations: [
    ProductDetailsPageComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule
  ]
})
export class ProductDetailsModule { 
}
