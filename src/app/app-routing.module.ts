import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from '@app-core/constants/route.urls.constants';

const routes: Routes = [
  { path: '', redirectTo: RouteUrls.route.home, pathMatch: 'full' },
  {
    path: RouteUrls.route.home,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: RouteUrls.route.productList,
    loadChildren: () =>
      import('./modules/product-list/product-list.module').then((m) => m.ProductListModule),
  },
  {
    path: `${RouteUrls.route.product}/:id`,
    loadChildren: () =>
      import('./modules/product-details/product-details.module').then((m) => m.ProductDetailsModule),
  },
  {
    path: RouteUrls.route.checkout,
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: RouteUrls.route.acknowledge,
    loadChildren: () =>
      import('./modules/acknowledgment/acknowledgment.module').then((m) => m.AcknowledgmentModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
