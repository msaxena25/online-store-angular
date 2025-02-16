import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcknowledgmentRoutingModule } from './acknowledgment-routing.module';
import { AcknowledgmentPageComponent } from './components/acknowledgment-page/acknowledgment-page.component';


@NgModule({
  declarations: [
    AcknowledgmentPageComponent
  ],
  imports: [
    CommonModule,
    AcknowledgmentRoutingModule
  ]
})
export class AcknowledgmentModule { }
