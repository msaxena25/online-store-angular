import { NgModule } from '@angular/core';

// Import feature modules
import { HomeModule } from './home/home.module';
import { ProductListModule } from './product-list/product-list.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AcknowledgmentModule } from './acknowledgment/acknowledgment.module';
import { ProductFilterModule } from './product-filter/product-filter.module';

@NgModule({
  imports: [
    HomeModule,
    ProductListModule,
    ProductDetailsModule,
    CheckoutModule,
    AcknowledgmentModule,
    ProductFilterModule
  ],
  exports: [
    HomeModule,
    ProductListModule,
    ProductDetailsModule,
    CheckoutModule,
    AcknowledgmentModule,
    ProductFilterModule
  ],
})
export class FeaturesModule {}
