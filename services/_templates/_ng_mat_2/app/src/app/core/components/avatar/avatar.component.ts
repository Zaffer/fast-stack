import { Component, OnInit, Input, inject } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  public auth = inject(AuthService);
}
