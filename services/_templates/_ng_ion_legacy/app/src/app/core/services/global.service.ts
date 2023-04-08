import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CompanyInfoService } from './company-info.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loadingState$ = new BehaviorSubject(true);

  public profileName$ = new BehaviorSubject('');
  public profileEmail$ = new BehaviorSubject('');
  public isAuthenticated$ = new BehaviorSubject(false);
  public isAuthenticating$ = new BehaviorSubject(true);
  public appTitle$ = new BehaviorSubject('');

  constructor(
    private auth: AuthService,
    private company: CompanyInfoService
  ) {}

  initialiseState() {

    const subs = this.auth.isAuthenticated$.subscribe({
      next: isAuthenticated => {
        if (!isAuthenticated) {
          this.loadingState$.next(false);
          subs.unsubscribe();
          return;
        } else {

          this.isAuthenticated$.next(isAuthenticated);
          this.auth.user$.subscribe(user => {
            this.profileName$.next(user.nickname);
            this.profileEmail$.next(user.email);
          });

          this.company.getCompany();
          this.company.company$.subscribe({
            next: company => {
              this.loadingState$.next(company === null);
            },
            error: err => {
              this.loadingState$.error(err);
            }
          })
        }
      },
      error: err => {
        this.loadingState$.error(err);
      }
    })
  }

  getAppTitle() {
    return this.appTitle$.asObservable();
  }

  setAppTitle(title: string) {
    this.appTitle$.next(title);
  }

  getProfileEmailSync() {
    return this.profileEmail$.getValue();
  }
}
