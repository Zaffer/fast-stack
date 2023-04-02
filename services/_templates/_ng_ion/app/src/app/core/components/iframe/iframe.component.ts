import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { BypassSecurityPipe } from '../../pipes/bypass-security.pipe';

@Component({
  standalone: true,
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  imports: [BypassSecurityPipe]
})
export class IframeComponent implements OnInit, ViewWillEnter, ViewWillLeave {

  // @Input() src: string;
  @Input() sourceUrl: string;

  constructor() { }

  ngOnInit(): void { }

  ionViewWillEnter(): void { }

  ionViewWillLeave(): void { }

}
