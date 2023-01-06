import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { GlobalService } from './core/services/global.service';
import { ColorSchemeService } from './core/services/theme/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public auth: AuthService,
    private global: GlobalService,
    private themeService: ColorSchemeService
  ) {
    this.themeService.load();
  }


  // ngOnInit(): void {
  //   this.global.initialiseState();
  // }
}
