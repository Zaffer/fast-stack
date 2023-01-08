import { Component, OnInit, Input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() matMenu!: MatMenu | null;

  avatar: string | undefined

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.avatar = profile?.picture)
    );
  }

}
