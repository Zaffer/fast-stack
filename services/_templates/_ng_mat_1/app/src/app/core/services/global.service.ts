import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private auth: AuthService,
  ) { }

  public userRoleId: number | undefined = 0;
  public profileEmail$ = new BehaviorSubject('');
  public companyId$ = new BehaviorSubject(0);
  public userRoleIdObservable$ = new BehaviorSubject(this.userRoleId);

  getProfileEmail() {
    return this.profileEmail$.getValue();
  }

  getCompanyId() {
    return this.companyId$.asObservable();
  }

  initialiseState() {
    // this.auth.user$.subscribe(user => {
    //   this.profileEmail$.next(user?.email || "");
    // });
  }

}
