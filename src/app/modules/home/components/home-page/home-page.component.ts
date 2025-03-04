import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.components';
import { HEADER_CONFIG } from 'src/app/core/constants/header.config';
import { RouteUrls } from 'src/app/core/constants/route.urls.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BaseComponent {
  headerConfig = HEADER_CONFIG['*'];
  showHeader = true;
  ngOnInit() {
    const sub$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === RouteUrls.route.checkout) {
        this.headerConfig = HEADER_CONFIG[event.url];
      } else {
        this.headerConfig = HEADER_CONFIG['*'];
      }
    });
    this.subscriptions$.add(sub$);
  }
}
