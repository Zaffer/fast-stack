import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../services/sidenav/sidenav.service';
import { animateText, animateSideNav } from '../../animations/nav.animate';
import { Router } from '@angular/router';
// import { SideNavService } from '../../services/nav.service';

interface NavLink {
  icon: string;
  name: string;
  link: string;
}

interface NavGroup {
  icon: string;
  name: string;
  link?: string;
  group?: NavLink[]
}

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss'],
  animations: [animateSideNav, animateText]
})
export class MenuMainComponent implements OnInit {
  public isSideNavOpen: boolean = false;
  public isLinkTextShown: boolean = false;

  public mainNavs: NavGroup[] = [
    { icon: 'settings', name: 'Settings', link: '/' },
    { icon: 'lock', name: 'Security', link: '/dashboard' },
    { icon: 'dashboard', name: 'Overall Dashboard', link: '/dashboard' },
    { icon: 'report-problem', name: 'Problems and many more other things', link: '/dashboard' }
  ];

  constructor(public router: Router, private sideNavService: SideNavService) { }

  ngOnInit(): void { }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen

    setTimeout(() => {
      this.isLinkTextShown = this.isSideNavOpen;
    }, 200)
    this.sideNavService.isSideNavOpen.next(this.isSideNavOpen)
  }

}
