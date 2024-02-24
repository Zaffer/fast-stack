import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NavBarTabComponent } from './nav-bar-tab.component';

@Component({
  standalone: true,
  imports: [CommonModule, NavBarTabComponent],
  selector: 'app-nav-bar-tabs',
  templateUrl: './nav-bar-tabs.component.html',
})
export class NavBarTabsComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  constructor(private authService: AuthService) {}
}