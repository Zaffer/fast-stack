import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../../services/sidenav/sidenav.service';
import { animateText, animateSideNav } from '../../animations/nav.animate';

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

  @Input() drawerRef!: MatSidenav;

  public isSideNavOpen: boolean = false;
  public isLinkTextShown: boolean = false;

  public mainNavs: NavGroup[] = [
    { icon: 'home', name: 'Home', link: '/' },
    { icon: 'settings', name: 'Settings', link: '/settings' },
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
