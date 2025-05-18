import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app-shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {
  route: any;
  router: any;
  loaderService: LoaderService;
  subscriptions$ = new Subscription();
  constructor() {
    this.route = inject(ActivatedRoute);
    this.loaderService = inject(LoaderService);
    this.router = inject(Router);
  }

  // Get route parameters once
  getRouteParam(param: string): string {
    return this.route.snapshot.paramMap.get(param);
  }

  // Get query parameters once
  getQueryParam(param: string): string | null {
    return this.route.snapshot.queryParamMap.get(param);
  }

  // Navigate to a new route
  navigateTo(path: string, params?: any) {
    if (params) {
      this.router.navigate([path], { queryParams: params });
    } else {
      this.router.navigate([path]);
    }
  }

  // Navigate with route parameters
  navigateWithParams(path: string, params: { [key: string]: any }) {
    this.router.navigate([path, params]);
  }

  // Navigate with query parameters
  navigateWithQuery(path: string, queryParams: { [key: string]: any }) {
    this.router.navigate([path], { queryParams });
  }

  // Helper method to auto-add to sub object
  addSub(subscription: Subscription) {
    this.subscriptions$.add(subscription);
  }


  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
