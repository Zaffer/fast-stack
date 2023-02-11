import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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

  // // TODO reimpliment this to shit menu to the top of the page with menu selection dropdown, reference Google Cloud Platform website
  // isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private _breakpointObserver: BreakpointObserver, public loaderService: LoaderService, public colorSchemeService: ColorSchemeService) { }

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
