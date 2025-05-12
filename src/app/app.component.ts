import { Component } from '@angular/core';
import { HEADER_CONFIG } from '@app-core/constants/header.config';
import { RouteUrls } from '@app-core/constants/route.urls.constants';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BaseComponent } from '@app-core/components/base.components';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'ycompany-rims';

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
