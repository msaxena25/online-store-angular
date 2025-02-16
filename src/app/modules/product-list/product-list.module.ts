import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductFilterModule } from '../product-filter/product-filter.module';


@NgModule({
  declarations: [
    ProductListPageComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ProductFilterModule
  ],
  exports:[ProductListPageComponent]
})
export class ProductListModule { }
