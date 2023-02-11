import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { ColorSchemeService } from '../../services/theme/color-scheme.service';
import { animateMainContent } from '../../animations/nav.animate';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  // animations: [animateMainContent]
})
export class NavComponent {

  constructor(public loaderService: LoaderService, public colorSchemeService: ColorSchemeService) { }

  ngOnInit() { }

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }

  getTheme() {
    return this.colorSchemeService.currentActive();
  }

  toggleTheme() {
    let newTheme = this.getTheme() === "dark" ? "light" : "dark"
    this.setTheme(newTheme);
  }
}
