import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
