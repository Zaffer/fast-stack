import { Component, Inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { IconModule } from '../../modules/icon/icon.module';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CompanyInfoService } from '../../services/company-info.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  avatar: string | undefined;
  profileName: string;
  profileEmail: string;
  defaultFloorRouterLink$: Observable<string>;
  elem: any;
  fullscreen = false;
  isAuthenticated = false;

  constructor(
    private menu: MenuController,
    // private authService: AuthService,
    private router: Router,
    private company: CompanyInfoService,
    public toast: ToastController,
    public auth: AuthService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuth) => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.auth.user$.subscribe(profile => {
            this.avatar = profile?.picture;
            this.profileName = profile.nickname;
            this.profileEmail = profile.email;
          }
          )
        }
      },
    });

    this.defaultFloorRouterLink$ = this.company.getDefaultFloor().pipe(map(floor => `map/${floor}`));

    this.elem = document.documentElement;
  }

  navigateToDefaultFloor() {
    this.company.navigateToDefaultFloor();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.document.location.origin });
  }

  openFullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.fullscreen = true;
  }

  closeFullScreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.fullscreen = false;
  }

  checkFullScreen() {
    if(this.document.fullscreen) {
      this.fullscreen = true;
    } else {
      this.fullscreen = false;
    }
  }
}