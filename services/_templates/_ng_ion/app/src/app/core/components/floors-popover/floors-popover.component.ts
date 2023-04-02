import { Component, Input, OnInit } from '@angular/core';
import { QuickDeskService } from '../../api/qrs';

@Component({
  selector: 'app-floors-popover',
  templateUrl: './floors-popover.component.html',
  styleUrls: ['./floors-popover.component.scss'],
})
export class FloorsPopoverComponent implements OnInit {

  buildings: any;
  floors: string[];
  @Input() close: (url: string) => void;

  constructor(
    private qrs: QuickDeskService,
  ) { }

  ngOnInit() {
    this.getCompany();
  }

  getFloorLink(floorId: number) {
    this.close(`/map/${floorId}`);
  }

  getCompany() {
    this.qrs.getCompaniesV1QuickdeskCompanyGet().subscribe({
      error(err) {
      },
      next: (value) => {
        this.buildings = value[0].buildings;

      },
    });
  }
}
