import { Component, inject } from '@angular/core';

import { ThemeService } from '../../services/theme/theme.service';
import {
  animateSnav,
  animateSnavContent,
  animateSnavText,
  animateSnavLock
} from '../../animations/nav.animate';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [animateSnav, animateSnavContent, animateSnavText, animateSnavLock],
})
export class NavComponent {
  private themeService = inject(ThemeService);

  isSnavExpanded = true; // Indicates whether the sidenav is expanded or not
  isSnavLocked = true; // Indicates whether the sidenav should stay open or not

  // TODO setup nav items object for nav items


  // TODO move these theme functions to a theme service, and make .toggle function for service
  setTheme(theme: string) {
    this.themeService.update(theme);
  }
  getTheme() {
    return this.themeService.currentActive();
  }
  toggleTheme() {
    let newTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }


}
