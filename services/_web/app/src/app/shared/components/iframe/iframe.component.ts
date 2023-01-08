import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BypassSecurityPipe } from 'src/app/core/pipes/bypass-security.pipe';

@Component({
  standalone: true,
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  imports: [BypassSecurityPipe]
})
export class IframeComponent implements OnInit {
  @Input() frameUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
