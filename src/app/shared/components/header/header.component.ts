import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base.components';
import { RouteUrls } from 'src/app/core/constants/route.urls.constants';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  cartCount: number = 0;
  title = 'my-app';
  isSidebarOpen = false;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;

  constructor(private checkoutService: CheckoutService) { super() }

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
