import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterRoutingModule } from './product-filter-routing.module';
import { ProductFilterPageComponent } from './components/product-filter-page/product-filter-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductFilterPageComponent
  ],
  imports: [
    CommonModule,
    ProductFilterRoutingModule,
    FormsModule
  ],
  exports: [ProductFilterPageComponent]
})
export class ProductFilterModule { }
