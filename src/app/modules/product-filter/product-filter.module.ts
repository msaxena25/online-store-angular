import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterRoutingModule } from './product-filter-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductFilterMobileViewComponent } from './components/product-filter-mobile-view/product-filter-mobile-view.component';
import { ProductFilterDesktopViewComponent } from './components/product-filter-desktop-view/product-filter-desktop-view.component';
import { ProductFilterCategoriesComponent } from './components/product-filter-categories/product-filter-categories.component';


@NgModule({
  declarations: [
    ProductFilterMobileViewComponent,
    ProductFilterDesktopViewComponent,
    ProductFilterCategoriesComponent
  ],
  imports: [
    CommonModule,
    ProductFilterRoutingModule,
    FormsModule
  ],
  exports: [ProductFilterDesktopViewComponent, ProductFilterMobileViewComponent]
})
export class ProductFilterModule { }
