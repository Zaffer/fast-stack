import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AssetService } from 'src/app/core/api/sqr';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Tab1Page {
  private sqr_api = inject(AssetService)
  apiData: String = "pre"

  constructor() { }

  ionViewDidEnter() {
    this.sqr_api.assetScanV0AssetScanScanCodeGet("2").subscribe({
      next: data => {
        this.apiData = JSON.stringify(data)
      },
      error: error => {
        this.apiData = JSON.stringify(error)
      }
    })
  }

}
