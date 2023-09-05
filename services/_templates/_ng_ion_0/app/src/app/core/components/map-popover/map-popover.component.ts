import { Component, OnInit, Input } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

import { environment } from '../../../../environments/environment';
import { MarkerTypes } from '../../services/icon-marker-map';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss'],
})
export class MapPopoverComponent implements OnInit {

  @Input() type: MarkerTypes;
  @Input() payload: any;
  readonly MarkerTypes = MarkerTypes;

  callToAction = ''

  get urlCourtSchedule() {
    return `/court/${this.payload.id}/schedule`;
  }

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.callToAction = `/live-scores/${this.payload.floor_id}/public`;
  }

  navigateTo(url: string) {
    this.popoverCtrl.dismiss().then(() => {
      this.navCtrl.navigateRoot(url);
    });
  }
}
