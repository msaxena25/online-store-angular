import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'my-app';
  isSidebarOpen = false;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isSidebarOpen && this.sidebar && !this.sidebar.nativeElement.contains(event.target) && !this.toggleBtn.nativeElement.contains(event.target)) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
