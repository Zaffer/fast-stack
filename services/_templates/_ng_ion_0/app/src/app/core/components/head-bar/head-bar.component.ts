import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '@auth0/auth0-angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss'],
})
export class HeadBarComponent implements OnInit, OnDestroy {

  heading$: Observable<string>;
  avatar: string | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private global: GlobalService,
    public auth: AuthService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.heading$ = this.global.getAppTitle();

    const tmp = this.auth.user$.subscribe(profile => {
      this.avatar = profile?.picture;
    });

    this.subscriptions.push(tmp);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
