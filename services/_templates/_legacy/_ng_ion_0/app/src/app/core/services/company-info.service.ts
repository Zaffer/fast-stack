import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { QuickDeskService } from '../api/api';
import { CompanyReadWithBuildingFloor } from '../api/qrs/model/companyReadWithBuildingFloor';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  companyName: string;
  private defaultFloor$ = new BehaviorSubject(null);
  public company$ = new BehaviorSubject<CompanyReadWithBuildingFloor[]>(null);

  constructor(
    private api: apiService,
    private router: Router,
    public navCtrl: NavController
  ) { }

  getDefaultFloorSync() {
    return this.defaultFloor$.value;
  }

  getDefaultFloor() {
    return this.defaultFloor$.asObservable();
  }

  setDefaultFloor(floor: number) {
    this.defaultFloor$.next(floor);
  }

  getCompany() {
    this.api.getCompanyGet().subscribe({
      next: (value) => {
        this.company$.next(value);
        this.setDefaultFloor(value[0].default_floor);
      },
      error: err => {
        this.company$.error(err);
      }
    });
  }

  navigateToDefaultFloor() {
    const url = `map/${this.getDefaultFloorSync()}`;
    this.navCtrl.navigateRoot(url);
  }
}
