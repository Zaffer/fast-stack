import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-nav-bar-tab',
  template: `
    <a
      [routerLink]="path"
      class="nav-bar__tab"
      routerLinkActive="nav-bar__tab--active"
    >
      {{ label }}
    </a>
  `,
})
export class NavBarTabComponent {
  @Input() path: string | undefined;
  @Input() label: string | undefined;
}