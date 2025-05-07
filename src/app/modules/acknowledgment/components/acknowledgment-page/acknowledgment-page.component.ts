import { Component } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base.components';
import { RouteUrls } from '../../../../core/constants/route.urls.constants';

@Component({
  selector: 'app-acknowledgment-page',
  templateUrl: './acknowledgment-page.component.html',
  styleUrls: ['./acknowledgment-page.component.scss']
})
export class AcknowledgmentPageComponent extends BaseComponent {
  orderId: string = '';
  orderDate: Date = new Date();
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  goHome(): void {
    this.navigateTo(RouteUrls.route.home);
  }
}
