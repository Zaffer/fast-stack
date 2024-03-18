import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-nav-bar-brand',
  template: `
    <div class="nav-bar__brand">
      <a routerLink="/">
        <img
          class="nav-bar__logo"
          src="https://cdn.auth0.com/blog/hub/code-samples/hello-world/auth0-logo.svg"
          alt="Auth0 shield logo"
          width="122"
          height="36"
        />
      </a>
    </div>
  `,
})
export class NavBarBrandComponent {}