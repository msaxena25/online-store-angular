import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@app-core/components/base.components';
import { IHeaderConfig } from '@app-core/constants/header.config';
import { RouteUrls } from '@app-core/constants/route.urls.constants';
import { CheckoutService } from '@app-core/services/checkout/checkout.service';
import { ProductFilterService } from '@app-core/services/product-filter/product-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  cartCount: number = 0;
  title = 'my-app';
  isSidebarOpen = false;
  productSearchText = '';
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  @Input() headerConfig: IHeaderConfig;

  constructor(private checkoutService: CheckoutService,
    private productFilterService: ProductFilterService
  ) { super() }

  ngOnInit(): void {
    // Subscribe to cart count to update badge in real-time
    this.checkoutService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isSidebarOpen && this.sidebar && !this.sidebar.nativeElement.contains(event.target) && !this.toggleBtn.nativeElement.contains(event.target)) {
      this.isSidebarOpen = false;
    }
  }

  onProductSearch() {
    if (location.pathname === `/${RouteUrls.route.productList}`) {
      this.navigateTo(RouteUrls.route.productList);
      this.productFilterService.updateFilter({ productName: this.productSearchText });
    } else {
      this.navigateWithQuery(RouteUrls.route.productList, {search: this.productSearchText}); 
    }
    
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onClickLogo() {
    this.navigateTo(RouteUrls.route.home);
  }
  goToBag() {
    this.navigateTo(RouteUrls.route.checkout);
  }
}
