import { OnInit, Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class BaseComponent {
  route: any;
  router: any;
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
  }

  // Get route parameters once
  getRouteParam(param: string): string | null {
    return this.route.snapshot.paramMap.get(param);
  }

  // Get query parameters once
  getQueryParam(param: string): string | null {
    return this.route.snapshot.queryParamMap.get(param);
  }

  // Navigate to a new route
  navigateTo(path: string, params?: any) {
    this.router.navigate([path], { queryParams: params });
  }

  // Navigate with route parameters
  navigateWithParams(path: string, params: { [key: string]: any }) {
    this.router.navigate([path, params]);
  }

  // Navigate with query parameters
  navigateWithQuery(path: string, queryParams: { [key: string]: any }) {
    this.router.navigate([path], { queryParams });
  }
}
