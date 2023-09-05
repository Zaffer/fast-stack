import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, map } from 'rxjs/operators';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';
import { LoadingController, ToastController, ViewWillEnter } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit, ViewWillEnter {

  profileName: string = '';
  isAuthenticated = false;
  activeLoader: HTMLIonLoadingElement;

  loading = true;


  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public doc: Document,
    private company: CompanyInfoService,
    public loadingController: LoadingController,
    private global: GlobalService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.presentLoading('Initialising application data...').then(() => {

      this.global.loadingState$.subscribe({
        next: loading => {
          this.loading = loading;

          if (!loading) {
            this.dismissLoader();

            this.isAuthenticated = this.global.isAuthenticated$.value;
            this.profileName = this.global.profileName$.value;
          }
        },
        error: err => {
          this.loading = false;
          this.dismissLoader();
          this.presentErrorToast();
        }
      })
    })
  }

  ionViewWillEnter(): void {
    this.company.company$
      .pipe(filter(company => company && company.length > 0))
      .subscribe(company => {
        this.global.setAppTitle(company[0].company_name);
      });
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: "There was an error.",
      color: "danger",
      duration: 10000
    })
    toast.present();
  }

  navigateToDefaultFloor() {
    this.company.navigateToDefaultFloor();
  }

  async presentLoading(message = "Loading events") {
    if (!this.activeLoader) {
      this.activeLoader = await this.loadingController.create({
        message
      });
    }

    await this.activeLoader.present();
  }

  async dismissLoader() {
    if (this.activeLoader) {
      await this.activeLoader.dismiss();
    }
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  signin(): void {
    this.auth.loginWithRedirect()
  }
}
