import { Component, OnInit } from '@angular/core';
import { GlobalService } from './core/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.global.initialiseState();
  }

}
