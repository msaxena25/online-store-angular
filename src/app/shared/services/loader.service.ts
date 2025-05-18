import { Injectable } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderComponent!: LoaderComponent;

  register(loader: LoaderComponent) {
    this.loaderComponent = loader;
  }

  show() {
    this.loaderComponent?.show();
  }

  hide() {
    this.loaderComponent?.hide();
  }
}
