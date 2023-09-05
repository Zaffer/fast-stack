import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QR Space Admin';

  constructor(
    // public auth: AuthService,
    // private global: GlobalService,
    // private themeService: ColorSchemeService
  ) {
    // this.themeService.load();
  }

  ngOnInit(): void {
    // this.global.initialiseState();
  }
}
